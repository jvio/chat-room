import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { Conversation, ConversationService, MessageService, User, UserService } from '../../../api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionKeys, StateService } from '../../../core/services/state/state.service';
import { HubService, MessageTypes } from '../../../core/services/hub/hub.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  chatForm: FormGroup;
  errorMessage: string;

  conversationId: number;
  conversation: Conversation;
  users: { [userId: number]: User } = {};
  user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private conversationService: ConversationService,
    private userService: UserService,
    private messageService: MessageService,
    private stateService: StateService,
    private hubService: HubService
  ) {}

  ngOnInit() {
    this.user = this.stateService.get<User>(SessionKeys.User);

    this.subscription.add(
      this.activatedRoute.params.subscribe(params => {
        this.conversationId = +params.id;
        this.conversationService.getConversationById(this.conversationId).subscribe(conversation => {
          this.conversation = conversation;
        });
      })
    );

    this.subscription.add(
      this.hubService.messages$
        .pipe(
          switchMap(message => {
            if (message.type === MessageTypes.Message && message.parentId === this.conversationId) {
              return this.conversationService.getConversationById(this.conversationId);
            }
            return of(this.conversation);
          })
        )
        .subscribe(conversation => {
          // adding only new items on notification from hub
          this.conversation.messages.push(...conversation.messages.slice(this.conversation.messages.length));
        })
    );

    this.userService.getUsers().subscribe(users => {
      this.users = {};
      users.forEach(user => {
        this.users[user.userId] = user;
      });
    });

    this.createForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.chatForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  resetForm() {
    this.chatForm.reset({
      content: ''
    });
  }

  send() {
    if (this.chatForm.valid) {
      this.errorMessage = '';
      const model = this.chatForm.value;
      this.resetForm();
      this.messageService
        .addMessage({
          content: model.content,
          userId: this.user.userId,
          conversationId: this.conversationId
        })
        .subscribe(
          message => {
            this.conversation.messages.push(message);
          },
          error => {
            this.errorMessage = error.statusText;
          }
        );
    }
  }
}

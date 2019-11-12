import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Conversation, ConversationService, MessageService, User, UserService } from '../../../api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  susbcription: Subscription = new Subscription();
  chatForm: FormGroup;
  errorMessage: string;

  conversationId: number;
  conversation$: Observable<Conversation>;
  users: { [userId: number]: User } = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private conversationService: ConversationService,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.susbcription.add(
      this.activatedRoute.params.subscribe(params => {
        this.conversationId = +params.id;
        this.conversation$ = this.conversationService.getConversationById(this.conversationId);
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
    this.susbcription.unsubscribe();
  }

  createForm() {
    this.chatForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  send() {
    if (this.chatForm.valid) {
      this.errorMessage = '';
      const model = this.chatForm.value;
      this.messageService
        .addMessage({
          content: model.content,
          userId: 1,
          conversationId: this.conversationId
        })
        .subscribe(
          () => {},
          error => {
            this.errorMessage = error.statusText;
          }
        );
    }
  }
}

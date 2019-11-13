import { Component, OnDestroy, OnInit } from '@angular/core';
import { Conversation, ConversationService, User, UserService } from '../../../api';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HubService, MessageTypes } from '../../../core/services/hub/hub.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  users: { [userId: number]: User } = {};
  conversations: Conversation[];

  constructor(
    private userService: UserService,
    private conversationService: ConversationService,
    private hubService: HubService
  ) {}

  ngOnInit() {
    this.conversationService.getConversations().subscribe(conversations => {
      this.conversations = conversations;
    });

    this.userService.getUsers().subscribe(users => {
      this.users = {};
      users.forEach(user => {
        this.users[user.userId] = user;
      });
    });

    this.subscription.add(
      this.hubService.messages$
        .pipe(
          switchMap(message => {
            if (message.type === MessageTypes.Conversation) {
              return this.conversationService.getConversations();
            }
            return of(this.conversations);
          })
        )
        .subscribe(conversations => {
          // adding only new items on notification from hub
          this.conversations.push(...conversations.slice(this.conversations.length));
        })
    );

    this.subscription.add(
      this.hubService.messages$
        .pipe(
          switchMap(message => {
            if (message.type === MessageTypes.Message) {
              return this.conversationService.getConversations();
            }
            return of(this.conversations);
          })
        )
        .subscribe(conversations => {
          this.conversations = conversations;
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

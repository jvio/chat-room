import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Conversation, ConversationService, User, UserService } from '../../../api';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  susbcription: Subscription = new Subscription();

  conversationId: number;
  conversation$: Observable<Conversation>;
  users: { [userId: number]: User };

  constructor(
    private activatedRoute: ActivatedRoute,
    private conversationService: ConversationService,
    private userService: UserService
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
  }

  ngOnDestroy() {
    this.susbcription.unsubscribe();
  }
}

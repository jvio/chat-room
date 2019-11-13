import { Component, OnInit } from '@angular/core';
import { Conversation, ConversationService, User, UserService } from '../../../api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: { [userId: number]: User } = {};
  conversations$: Observable<Conversation[]>;

  constructor(private userService: UserService, private conversationService: ConversationService) {}

  ngOnInit() {
    this.conversations$ = this.conversationService.getConversations();

    this.userService.getUsers().subscribe(users => {
      this.users = {};
      users.forEach(user => {
        this.users[user.userId] = user;
      });
    });
  }
}

export enum UsersTypes {
  Patients = 1,
  Doctors = 2
}

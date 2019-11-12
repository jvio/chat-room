import { Component, OnInit } from '@angular/core';
import { Conversation, ConversationService, User, UserService } from '../../../api';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: { [userId: number]: User } = {};
  conversations$: Observable<Conversation[]>;

  usersTypeForm: FormGroup;
  UserTypes = UsersTypes;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private conversationService: ConversationService
  ) {}

  ngOnInit() {
    this.conversations$ = this.conversationService.getConversations();

    this.userService.getUsers().subscribe(users => {
      this.users = {};
      users.forEach(user => {
        this.users[user.userId] = user;
      });
    });

    this.createForm();
  }

  createForm() {
    this.usersTypeForm = this.formBuilder.group({
      usersType: this.UserTypes.Patients
    });
  }

  resetForm() {
    this.usersTypeForm.reset({
      usersType: this.UserTypes.Patients
    });
  }
}

export enum UsersTypes {
  Patients = 1,
  Doctors = 2
}

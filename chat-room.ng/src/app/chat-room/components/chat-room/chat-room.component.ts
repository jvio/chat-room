import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConversationService, User, UserService } from '../../../api';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersTypes } from '../user-list/user-list.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  usersTypeForm: FormGroup;
  UserTypes = UsersTypes;
  chatForm: FormGroup;
  users: User[];
  errorMessage: string;
  modal: NgbModalRef;

  formatter = (user: User) => (user ? `${user.firstName} ${user.lastName}` : '');

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(term => term.length >= 0),
      map(term =>
        this.users.filter(user => new RegExp(term, 'mi').test(`${user.firstName} ${user.lastName}`)).slice(0, 10)
      )
    );

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private conversationService: ConversationService
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });

    this.createUsersTypeForm();
    this.createChatForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createChatForm() {
    this.chatForm = this.fb.group({
      user: ['', Validators.required]
    });
  }

  createUsersTypeForm() {
    this.usersTypeForm = this.fb.group({
      usersType: this.UserTypes.Doctors
    });
  }

  open(content) {
    this.modal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  start() {
    if (this.chatForm.valid) {
      this.errorMessage = '';
      const model = this.chatForm.value;
      this.conversationService
        .addConversation({
          users: [model.user.userId]
        })
        .subscribe(
          conversation => {
            this.router.navigate([conversation.conversationId], { relativeTo: this.activatedRoute });
            this.modal.dismiss();
          },
          error => {
            this.errorMessage = error.statusText;
          }
        );
    }
  }
}

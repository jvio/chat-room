import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../api';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  authForm: FormGroup;

  errorMessage: string;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.authForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  register() {
    if (this.authForm.valid) {
      this.errorMessage = '';
      const model = this.authForm.value;
      this.userService
        .createUser({
          username: model.username,
          password: model.password,
          firstName: model.firstName,
          lastName: model.lastName
        })
        .pipe(
          switchMap(user => {
            return this.userService.loginUser(user.username, model.password);
          })
        )
        .subscribe(
          () => {
            this.router.navigate(['/']);
          },
          error => {
            this.errorMessage = error.statusText;
          }
        );
    }
  }
}

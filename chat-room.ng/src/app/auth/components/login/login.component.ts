import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../api';
import { Router } from '@angular/router';
import { SessionKeys, StateService } from '../../../core/services/state/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;

  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private stateService: StateService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.authForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.authForm.valid) {
      this.errorMessage = '';
      const model = this.authForm.value;
      this.userService.loginUser(model.username, model.password).subscribe(
        user => {
          this.router.navigate(['/']);
        },
        error => {
          this.errorMessage = error.statusText;
        }
      );
    }
  }
}

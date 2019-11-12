import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private router: Router, private userServices: UserService) {}

  ngOnInit() {}

  signOut() {
    this.userServices.logoutUser().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}

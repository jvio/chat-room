import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../api';
import { Router } from '@angular/router';
import { HubService } from '../../services/hub/hub.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private router: Router, private userServices: UserService, private hubService: HubService) {}

  ngOnInit() {
    this.hubService.start();
  }

  signOut() {
    this.userServices.logoutUser().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserModel} from '../shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: UserModel | null;

  constructor(private authService:AuthService) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
  }

}

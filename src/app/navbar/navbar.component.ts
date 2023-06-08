import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  is_login: boolean = window.sessionStorage.length == 0 ? false : true

  constructor(private auth: AuthServiceService) { }

  logout() {
    this.auth.logout()
  }

  addClass() {

  }

}

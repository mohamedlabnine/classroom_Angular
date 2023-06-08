import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  is_login: boolean = window.sessionStorage.length == 0 ? false : true

  constructor(private auth: AuthServiceService) { }

  logout() {
    this.auth.logout()
  }

}

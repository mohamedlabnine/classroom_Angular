import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from '../model/login';
import { Register } from '../model/register';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private url: string = "http://localhost:8080/Auth"

  constructor(private http: HttpClient, private router: Router) { }

  login(login: Login): Observable<Object> {

    return this.http.post(this.url + "/login", login)

  }

  register(register: Register): Observable<Object> {
    return this.http.post(this.url + "/register", register)
  }

  logout() {
    window.sessionStorage.removeItem("user_id")
    window.sessionStorage.removeItem("role")
    window.sessionStorage.removeItem("token")

    this.router.navigate(["Auth"])
  }

  forgetPassword(email: string): Observable<Object> {
    return this.http.get(this.url + "/reset_password/" + email)
  }


}

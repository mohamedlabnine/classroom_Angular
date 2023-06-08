
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Login } from '../model/login';
import { Register } from '../model/register';
import { ResponceLogin } from '../model/responce-login';
import { ResponceRegister } from '../model/responce-register';
import { AuthServiceService } from '../service/auth-service.service';
import { SpinnerService } from '../service/spinner.service';
import { TosterComponent } from '../toster/toster.component';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent {

  //form of login
  form_login = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  })

  //form of registration
  form_registre = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    repeat_password: new FormControl(),
    is_student: new FormControl()
  })

  form_forget_password = new FormGroup({
    email: new FormControl()
  })

  valid_email_password = true

  valid_register = true

  is_email_already_exist = true

  valid_email_forgetPassword = true

  complete_information = true

  @ViewChild('closebutton') closebutton: any;

  constructor(private authservice: AuthServiceService,
    private rout: Router, private spinner: SpinnerService,
    private _snackBar: MatSnackBar) {

  }

  login(): void {
    if (this.form_login.value.email != null && this.form_login.value.password != null) {
      this.authservice.login(
        new Login(this.form_login.value.email,
          this.form_login.value.password)
      ).subscribe(
        response => this.checklogin(response as ResponceLogin)
      )
    } else {
      this.complete_information = false
    }
  }

  checklogin(response: ResponceLogin) {
    if (response.status == 404) {
      this.valid_email_password = false
    }
    else {
      window.sessionStorage.setItem("user_id", response.id_user.toString())
      window.sessionStorage.setItem("token", response.token)
      window.sessionStorage.setItem("role", response.role)

      this.valid_email_password = true

      if (response.role == "ROLE_STUDENT") {
        this.rout.navigate(['ClassStudent'])
      }
      else {
        this.rout.navigate(['ClassTecher'])
      }
    }
  }

  registre(): void {
    var firstname = this.form_registre.value.firstname
    var lastname = this.form_registre.value.lastname
    var email = this.form_registre.value.email
    var password = this.form_registre.value.password
    var repeat_password = this.form_registre.value.repeat_password
    var role = this.form_registre.value.is_student
    if (firstname != null && lastname != null && email != null && password != null && repeat_password != null && role != null) {
      if (password == repeat_password) {
        var user_register = new Register(firstname, lastname, email, password, role == "Student" ? true : false)
        this.authservice.register(user_register)
          .subscribe(res => this.checkRegister(res as ResponceRegister))
      }
      else {
        this.valid_register = false
      }
    }
    else {
      this.complete_information = false
    }

  }

  checkRegister(responce: ResponceRegister) {
    if (responce.status == 409) {
      this.is_email_already_exist = false
    }
    else {
      this._snackBar.openFromComponent(TosterComponent, {
        duration: 1000,
      });
    }
  }



  forgetPassword() {
    this.authservice.forgetPassword(this.form_forget_password.value.email).subscribe(
      res => this.checkSendSms(res as ResponceRegister)
    )
  }

  checkSendSms(res: ResponceRegister) {
    if (res.status == 500) {
      this.valid_email_forgetPassword = false
    }
    else {
      this.rout.navigate(["Auth"])
      this._snackBar.openFromComponent(TosterComponent, {
        duration: 1000,
      });
      this.closebutton.nativeElement.click()
    }
  }


  dismiss_error() {
    this.valid_email_password = true
    this.valid_register = true
    this.is_email_already_exist = true
    this.valid_email_forgetPassword = true
    this.complete_information = true
  }



}

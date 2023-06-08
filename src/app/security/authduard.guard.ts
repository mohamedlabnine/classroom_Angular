import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthServiceService } from '../service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthduardGuard implements CanActivate {
  jwtHelper = new JwtHelperService()
  constructor(private authservice: AuthServiceService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (window.sessionStorage.length == 0 || this.jwtHelper.isTokenExpired(window.sessionStorage.getItem("token"))) {
      this.authservice.logout()
      return false;
    }
    else {
      return true;
    }
  }





}

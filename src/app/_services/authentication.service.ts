import { Injectable } from '@angular/core';
import { ILoggedUser } from '../_interfaces/logged-user';
import { User } from '../_models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class Authentication {

  logInUrl="http://localhost:3000/user-authentication.login";

  constructor(
    private _http: HttpClient,
    private router: Router) { }

  login(userData: User): Observable<ILoggedUser>{
    return this._http.post<ILoggedUser>(this.logInUrl, JSON.stringify(userData))
    .do(user => {
        if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
    });
  }

  userLogged(){
    if (localStorage.getItem('currentUser')) {
        return true;
    }
    return false
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(["/"]);
  }
}

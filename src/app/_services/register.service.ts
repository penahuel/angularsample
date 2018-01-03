import { Injectable } from '@angular/core';
import { ILoggedUser } from '../_interfaces/logged-user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NewUser } from '../_models/new-user.form.model';

@Injectable()
export class Register {

  registerUrl="http://localhost:3000/user-authentication.register";

  constructor(
    private _http: HttpClient) { }

  register(userData: NewUser): Observable<ILoggedUser>{
    return this._http.post<ILoggedUser>(this.registerUrl, userData)
    .do(user => {
        if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return true;
    });
  }
}

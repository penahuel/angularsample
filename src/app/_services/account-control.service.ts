import { Injectable } from '@angular/core';
import { ILoggedUser } from '../_interfaces/logged-user';
@Injectable()
export class AccountControlService{
    constructor(){

    }

    getUserId(): number{
        let user: ILoggedUser = JSON.parse(localStorage.getItem('currentUser'));
        return user.userId;
    }

    getToken(): string{
        let user: ILoggedUser = JSON.parse(localStorage.getItem('currentUser'));
        return user.token;
    }
}
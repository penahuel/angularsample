import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Authentication } from '../_services/authentication.service';

@Injectable()
export class LoggedGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: Authentication) { }

    canActivate(route: ActivatedRouteSnapshot) { 
        if (this.authService.userLogged()){
            this.router.navigate(["/"]);
            return false;
        }
        return true;
    }
}
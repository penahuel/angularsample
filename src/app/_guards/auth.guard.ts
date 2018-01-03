import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LogInDialog } from '../user-management/user-login.component';
import { ModalControlService } from '../_services/modal-control.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router, 
        public dialog: MatDialog,
        private modalService: ModalControlService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            return true;
        }   
        this.modalService.openDialog(state.url);
        return false;
    }
}
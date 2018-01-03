import { Component } from '@angular/core';
import 'hammerjs';
import { Authentication } from './_services/authentication.service';
import { MatDialog } from '@angular/material';
import { LogInDialog } from './user-management/user-login.component';
import { ModalControlService } from './_services/modal-control.service';
import { CartService } from './_services/cart.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  cartItems: number;
  logo = './media/raven-logo.jpg';
  public dialog: MatDialog;
  numberOfTickets: number[];

  constructor(
    private authService: Authentication,
    private cartService: CartService,
    private modalControl: ModalControlService){}

  userLogOut(){
    this.authService.logout()
  }

  userLogged(){
    return this.authService.userLogged();
   }

  login(){
    this.modalControl.openDialog("");
  }

  ngOnInit(): void {
    this.numberOfTickets=this.cartService.numberOfTickets;
  }
}


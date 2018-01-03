import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { CartService } from '../_services/cart.service';

@Injectable()
export class CartGuard implements CanActivate {

    constructor(
        private cartService: CartService) { }

    canActivate() {
        if (this.cartService.numberOfTickets[0]>0) {
            return true;
        }   
        alert('No tickets in the cart');
        return false;
    }
}
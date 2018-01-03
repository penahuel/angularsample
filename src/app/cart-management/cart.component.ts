import { Component, OnInit } from '@angular/core';
import { CartService } from '../_services/cart.service';
import { Cart, Ticket } from '../_models/cart.model';
import { Router } from '@angular/router';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart;

  constructor(
    private router: Router,
    private cartService: CartService
  ) { 

  }

  total(): number{
    return this.cartService.total();
  }

  delItem(ticket: Ticket){
    this.cartService.delItem(ticket);
    if(this.cartService.numberOfTickets[0]==0){
      alert('The cart has no items, going back');
      this.router.navigate(['/flight-search']);  
    }
  }

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }
}

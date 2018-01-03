import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Ticket, Cart } from '../_models/cart.model';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
@Injectable()
export class CartService {
    cart= new Cart();
    getCartUrl = "http://localhost:3000/cart-service.get";
    setCartUrl = "http://localhost:3000/cart-service.set";
    private userId: number;
    numberOfTickets:number[] = [0];

    setUserId(userId:number){
        this.userId=userId;
        this.sync();
    }

    constructor(
        private _http: HttpClient) {
            this.sync()
            this.setNumberOfTickets()
         }

    // addOrUpdate(ticket: Ticket, cuantity:number){
    //     let found = this.cart.tickets.find(t=> t.ticket.id==ticket.id);
    //     if (found){
    //         if (cuantity>0){
    //             found.cuantity=cuantity
    //             localStorage.setItem('currentCart', JSON.stringify(this.cart));
    //             this.setNumberOfTickets()
    //         }
    //         const index: number = this.cart.tickets.indexOf(found);
    //         if (index !== -1) {
    //             this.cart.tickets.splice(index, 1);
    //             localStorage.setItem('currentCart', JSON.stringify(this.cart));
    //             this.setNumberOfTickets()
    //         }  
    //     }
    //     this.cart.tickets.push({ticket, cuantity});
    //     localStorage.setItem('currentCart', JSON.stringify(this.cart));
    //     this.setNumberOfTickets()
    // }

    addTickets(ticket: Ticket, cuantity: number){
        let found = this.cart.tickets.find(t=> t.ticket.id==ticket.id);
        if (found){
            if (cuantity>0){
                found.cuantity+=cuantity
                localStorage.setItem('currentCart', JSON.stringify(this.cart));
                this.setNumberOfTickets()
            }
        }
        else{
            this.cart.tickets.push({ticket, cuantity});
            localStorage.setItem('currentCart', JSON.stringify(this.cart));
            this.setNumberOfTickets()
        }
    }

    delItem(ticket: Ticket){
        let found = this.cart.tickets.find(t=> t.ticket.id==ticket.id);
        const index: number = this.cart.tickets.indexOf(found);
        if (index !== -1) {
            this.cart.tickets.splice(index, 1);
            localStorage.setItem('currentCart', JSON.stringify(this.cart));
            this.setNumberOfTickets();
        } 
    }

    setNumberOfTickets(){
        this.numberOfTickets[0]=0;
        this.cart.tickets.forEach(t=>this.numberOfTickets[0] = this.numberOfTickets[0] + t.cuantity);
    }

    private sync(){
        this.cart=JSON.parse(localStorage.getItem('currentCart'))
        if (!this.cart.userId){
            this.cart.userId= this.userId,
            this.cart.tickets= []; 
            localStorage.setItem('currentCart', JSON.stringify(this.cart));         
        }
        //this.getFromCloud().subscribe(c=>{
        //    this.mergeCarts(this.cart, c);
        //    this.setInCloud(this.cart);
        //})
    }

    total(): number{
        let total = 0;
        this.cart.tickets.forEach(t=>total= total + t.ticket.cost * t.cuantity)
        return total;
    }

    cleanCart(){
        this.cart=null;
        this.sync();
    }

    getCart(){
        return this.cart;
    }
    
    private getFromCloud(): Observable<Cart>{
        return this._http.get<Cart>(this.getCartUrl + "?userId:" + this.userId)
    }

    private setInCloud(cart: Cart): Observable<boolean>{
        return this._http.post<boolean>(this.setCartUrl, cart).do(res=>{
            return true;
        })
    }

    // private mergeCarts(localCart: Cart, cloudCart: Cart){
    //     cloudCart.tickets.forEach(t=> this.addOrUpdate(t.ticket, t.cuantity))
    // }

    private handleError(err: HttpErrorResponse){
        console.log(err.message);
        return Observable.throw(err.message);
    }
}

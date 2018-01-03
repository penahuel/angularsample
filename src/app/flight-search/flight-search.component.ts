import { Component, OnInit } from '@angular/core';
import { FlightForm } from '../_models/flight.form.model'
import { FlightService } from '../_services/flight.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IFlight } from '../_interfaces/flight';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
  
  FlightForm: FormGroup;
  flight: FlightForm;
  flightSearchList: IFlight[];
  errorMessage: string;
  cuantityModel: number[]=[];

  constructor(
    private flightService: FlightService,
    private fb: FormBuilder,
    private cartService: CartService) { }

  SearchForFlights(){
    this.flight=new FlightForm(
      this.FlightForm.get('origin').value,
      this.FlightForm.get('destination').value,
      this.FlightForm.get('date').value);    
      this.flightService.postFlightForm(this.flight)
      .subscribe(flightSearchList=> {
        this.flightSearchList = flightSearchList,
        this.flightSearchList.forEach(f=>this.cuantityModel[f.id]=0)
      },
    error=> this.errorMessage=<any>error);
  }

  addToCart(id: number){
    if (this.cuantityModel[id]>0){
      let ticket = this.flightSearchList.find(t=> t.id==id);
      this.cartService.addTickets(ticket, this.cuantityModel[id]);
    }
    this.cuantityModel[id]=0;
  }

  removeOne(id: number){
    if (this.cuantityModel[id]>0){
      this.cuantityModel[id]-=1;
    }
  }

  addOne(id: number){
    this.cuantityModel[id]+=1;
  }

  ngOnInit() {
    this.FlightForm = this.fb.group({
      origin: '',
      destination: '',
      date: ''
    });
  }

}

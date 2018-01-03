import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from '@angular/router';
import { FlightSearchComponent } from './flight-search.component';
import { FlightService } from '../_services/flight.service';
import { AuthGuard } from '../_guards/auth.guard';
import { AppModule } from '../app.module';
import { routing } from '../app.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  declarations: [FlightSearchComponent],
  providers: []
})
export class FlightSearchModule { }

import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';
import { AppComponent } from './app.component';
import { TravelInfoModule } from './travel-info/travel-info.module';
import { FlightSearchModule } from './flight-search/flight-search.module';
import { CartModule } from './cart-management/cart.module';
import { ProfileModule } from './profile-control/profile.module';

@NgModule({
  imports: [
    SharedModule,
    TravelInfoModule,
    FlightSearchModule,
    ProfileModule,
    CartModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

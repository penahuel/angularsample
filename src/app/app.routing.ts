import { Routes, RouterModule } from "@angular/router";
import { TravelInfoListComponent } from "./travel-info/travel-info-list.component";
import { FlightSearchComponent } from "./flight-search/flight-search.component";
import { AuthGuard } from "./_guards/auth.guard";
import { TravelInfoDetailComponent } from "./travel-info/travel-info-detail.component";
import { UserRegisterComponent } from "./user-management/user-register.component";
import { LoggedGuard } from "./_guards/logged.guard";
import { CartComponent } from "./cart-management/cart.component";
import { CartGuard } from "./_guards/cart.guard";
import { ProfileComponent } from "./profile-control/profile.component";
import { PasswordChangeComponent } from "./profile-control/profile-components/password-change.component";
import { PersonalChangeComponent } from "./profile-control/profile-components/personal-change.component";
import { AddressesChangeComponent } from "./profile-control/profile-components/addresses-change.component";
import { SummaryComponent } from "./profile-control/profile-components/summary.component";


const appRoutes: Routes = [
    { path: 'travelInfoList', component: TravelInfoListComponent },
    { path: 'flight-search', component: FlightSearchComponent, canActivate: [AuthGuard] },
    { path: 'travelInfoList', component: TravelInfoListComponent },
    { path: 'travelInfoList/:travelInfoId', component: TravelInfoDetailComponent},
    { path: 'register', component: UserRegisterComponent, canActivate: [LoggedGuard]},
    { path: 'cart', component: CartComponent, canActivate: [CartGuard, AuthGuard]},

    { path: 'profile', 
      component: ProfileComponent,
      canActivate: [AuthGuard],
      children:[
        { path: '', redirectTo: 'summary', pathMatch: 'full' }, 
        { path: 'personalinformation', component: PersonalChangeComponent, outlet: 'profile' },
        { path: 'password', component: PasswordChangeComponent, outlet: 'profile' },
        { path: 'addresses', component: AddressesChangeComponent, outlet: 'profile' },
        { path: 'summary', component: SummaryComponent, outlet: 'profile' }
      ]},

    { path: '', redirectTo: 'travelInfoList', pathMatch: 'full'},
    { path: '**', redirectTo: 'travelInfoList', pathMatch: 'full'}
  ]
  export const routing = RouterModule.forRoot(appRoutes)
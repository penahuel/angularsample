import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './_guards/auth.guard';
import { Authentication } from './_services/authentication.service';
import { MatDialog } from '@angular/material';
import { ModalControlService } from './_services/modal-control.service';
import { FlightService } from './_services/flight.service';
import { TravelInfoService } from './_services/travel-info.service';
import { Register } from './_services/register.service';
import { LoggedGuard } from './_guards/logged.guard';
import { RouterStateSnapshot } from '@angular/router/src/router_state';
import { CartService } from './_services/cart.service';
import { CartGuard } from './_guards/cart.guard';
import { ProfileService } from './_services/profile.service';
import { AccountControlService } from './_services/account-control.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthGuard,
    Authentication,
    MatDialog,
    ModalControlService,
    FlightService,
    TravelInfoService,
    Register,
    LoggedGuard,
    CartService,
    CartGuard,
    ProfileService,
    AccountControlService
  ]
})
export class CoreModule { }

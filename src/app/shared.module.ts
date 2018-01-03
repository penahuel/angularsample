import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LogInDialog } from './user-management/user-login.component';
import { MatDialog, MatDialogModule } from '@angular/material';
import 'hammerjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { CoreModule } from './core.module';
import { UserRegisterComponent } from './user-management/user-register.component';
import { CartModule } from './cart-management/cart.module';
import { CartComponent } from './cart-management/cart.component';
import { ProfileModule } from './profile-control/profile.module';

@NgModule({
  declarations: [
    AppComponent,
    LogInDialog,
    UserRegisterComponent
  ],
  entryComponents:[
    LogInDialog
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    routing,
    CoreModule
  ]
})
export class SharedModule { }

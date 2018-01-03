import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared.module';
import { routing } from '../app.routing';
import { PasswordChangeComponent } from './profile-components/password-change.component';
import { SummaryComponent } from './profile-components/summary.component';
import { PersonalChangeComponent } from './profile-components/personal-change.component';
import { AddressesChangeComponent } from './profile-components/addresses-change.component';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [ProfileComponent, PasswordChangeComponent, SummaryComponent, PersonalChangeComponent, AddressesChangeComponent]
})
export class ProfileModule { }

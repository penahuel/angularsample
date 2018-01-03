import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelInfoListComponent } from './travel-info-list.component';
import { TravelInfoDetailComponent } from './travel-info-detail.component';
import { RouterModule } from '@angular/router';
import { TravelInfoService } from '../_services/travel-info.service';
import { routing } from '../app.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [TravelInfoListComponent, TravelInfoDetailComponent],
  providers: []
})
export class TravelInfoModule { }

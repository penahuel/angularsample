import { Component, OnInit } from '@angular/core';
import { ITravelInfo } from '../_interfaces/travel-info';
import { Router, ActivatedRoute } from '@angular/router';
import { TravelInfoService } from '../_services/travel-info.service';

@Component({
  selector: 'app-travel-info-detail',
  templateUrl: './travel-info-detail.component.html',
  styleUrls: ['./travel-info-detail.component.css']
})
export class TravelInfoDetailComponent implements OnInit {
  travelInfo: ITravelInfo;
  errorMessage: string;
  pageTitle: string = 'Travel Details';
  
  constructor(private _route: ActivatedRoute, 
    private _router: Router,
    private _travelInfoService: TravelInfoService) { }

  ngOnInit() {
    let id = +this._route.snapshot.paramMap.get('travelInfoId');
    this._travelInfoService.getTravelInfo(id)
                          .subscribe(travelInfo => {
                            this.travelInfo = travelInfo;
                          },
                          error=> this.errorMessage = <any>error);            
  }

  onBack(): void {
    this._router.navigate(['/travelInfoList']);
  }
}

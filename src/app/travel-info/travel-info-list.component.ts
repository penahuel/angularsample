import { Component, OnInit } from '@angular/core';
import { TravelInfoService } from '../_services/travel-info.service';
import { ITravelInfo } from '../_interfaces/travel-info';

@Component({
  templateUrl: './travel-info-list.component.html',
  styleUrls: ['./travel-info-list.component.css']
})
export class TravelInfoListComponent implements OnInit {
  errorMessage: string;
  travelInfoList: ITravelInfo[] = [];

  constructor(private _travelInfoService: TravelInfoService) { }

  ngOnInit(): void {
    this._travelInfoService.getTravelInfoList()
                          .subscribe(travelInfoList => {
                            this.travelInfoList = travelInfoList;
                          },
                          error=> this.errorMessage = <any>error);
  }
}

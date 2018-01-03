import { Injectable } from '@angular/core';
import { ITravelInfo } from '../_interfaces/travel-info';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class TravelInfoService {
  private _travelInfoListUrl = './api/travel-info/travel-list.get-all.json';
  private _travelInfoUrl = './api/travel-info/travel-list.get-one.json';

  constructor(private _http: HttpClient) { }

  getTravelInfoList(): Observable<ITravelInfo[]>{
    return this._http.get<ITravelInfo[]>(this._travelInfoListUrl)
                    .catch(this.handleError);
  }
  getTravelInfo(id: number): Observable<ITravelInfo>{
    return this._http.get<ITravelInfo[]>(this._travelInfoUrl + "?id:" + id)
                    .catch(this.handleError);
  }
  
  private handleError(err: HttpErrorResponse){
    console.log(err.message);
    return Observable.throw(err.message);
  }
}

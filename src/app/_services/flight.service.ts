import { Injectable } from '@angular/core';
import { FlightForm } from '../_models/flight.form.model';
import { IFlight } from '../_interfaces/flight';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FlightService {

  private _flightListUrl = "./api/flight-info/flight-list.get-search.json"

  constructor(private _http: HttpClient) { }

  postFlightForm(flight: FlightForm): Observable<IFlight[]>{
      return this._http.get<IFlight[]>(this._flightListUrl)
                      .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse){
      console.log(err.message);
      return Observable.throw(err.message);
    }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IProfile } from "../_interfaces/profile";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ProfileService {

    getSummUrl="http://localhost:3000/profile.get";

    constructor(
        private _http: HttpClient
    ){}

    getProfile(userId: number, token: string): Observable<IProfile>{
        return this._http.post<IProfile>(this.getSummUrl, JSON.stringify({id: userId, token: token}))
        .do(profile => {
            if (profile) {
                return profile;
            }
            return false;
        });
      }

}
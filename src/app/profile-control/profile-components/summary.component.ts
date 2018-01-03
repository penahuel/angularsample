import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../_services/profile.service';
import { AccountControlService } from '../../_services/account-control.service';
import { IProfile } from '../../_interfaces/profile';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  summary: IProfile;

  constructor(
    private profileService: ProfileService,
    private accountControlService: AccountControlService
  ) { }

  getProfile(){
    let userId = this.accountControlService.getUserId();
    let token = this.accountControlService.getToken();

    this.profileService.getProfile(userId, token).subscribe(p=> {
      this.summary=p;
    });
  }

  ngOnInit() {
    this.getProfile();
  }

}

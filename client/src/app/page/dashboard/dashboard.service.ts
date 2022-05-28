import { Injectable } from '@angular/core';
import { ApiBase } from 'src/app/api-base';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends ApiBase {

  constructor(
    http: HttpClient,
    private router: Router
  ) {
    super(http);
  }

  // Initialize the available routes
  protected override initEndpoints() {
    this.setEndpoints({
      office: 'office'
    })
  }
  
  private getOfficeReq() {
    return this.get(this.buildURL('office'));
  }

  getOffice() {
    this.getOfficeReq().subscribe((user => {
      console.log(user)
    }))
  }
}

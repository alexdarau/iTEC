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

  private createOfficeReq(data: any) {
    return this.post(this.buildURL('office'), data);
  }
  private deleteOfficeReq(id: string) {
    return this.delete(this.buildDeleteURL('office', id));
  }
  private getOfficeReq() {
    return this.get(this.buildURL('office'));
  }

  addOffice(data: any) {
    this.createOfficeReq(data).subscribe((user => {
      console.log(user)
    }))
  }
  getOffice() {
    this.getOfficeReq().subscribe((user => {
      console.log(user)
    }))
  }
  deleteOffice(data: any) {
    this.deleteOfficeReq(data).subscribe((user => {
      console.log(user)
    }))
  }
}

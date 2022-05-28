import { Injectable } from '@angular/core';
import { ApiBase } from 'src/app/api-base';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends ApiBase {

  constructor(
    http: HttpClient,
    private router: Router
  ) {
    super(http);
  }

  protected override initEndpoints() {
    this.setEndpoints({
      office: 'office'
    })
  }

  private getOfficeReq() {
    return this.get(this.buildURL('office'));
  }
  
  private getFloorReq(name: string) {
    return this.get(this.buildGetURL('floor', name));
  }

  private getWorkdeskReq() {
    return this.get(this.buildURL('workdesk'));
  }

  private createWorkdeskReq(data: any) {
    return this.post(this.buildURL('workdesk'), data);
  }

  private bookWorkdeskReq(data: any) {
    return this.post(this.buildURL('book'), data);
  }

  private getWorkdeskByDateReq(id: string, start: string, end: string) {
    return this.get(this.buildGetWorkdeskURL('book', id, start, end))
  }

  getOffice() {
    this.getOfficeReq().subscribe((user => {
      console.log(user)
    }))
  }

  getFloor(name: string) {
    this.getFloorReq(name).subscribe((user => {
      console.log(user)
    }))
  }

  getWorkdesk() {
    this.getWorkdeskReq().subscribe((user => {
      console.log(user)
    }))
  }

  createWorkdesk(data: any) {
    this.createWorkdeskReq(data).subscribe((user => {
      console.log(user)
    }))
  }

  bookWorkdesk(data: any) {
    this.bookWorkdeskReq(data).subscribe((user => {
      console.log(user)
    }))
  }

  getWorkdeskByDate(id: string, start: string, end: string) {
    this.getWorkdeskByDateReq(id, start, end).subscribe((user => {
      console.log(user)
    }))
  }
}

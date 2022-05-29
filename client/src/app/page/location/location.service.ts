import { Injectable } from '@angular/core';
import { ApiBase } from 'src/app/api-base';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { iOffice, iOfficeReq } from 'src/app/interfaces/offcie.interface';
import { iFloor, iFloorReq } from 'src/app/interfaces/floor.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends ApiBase {

  public offices$ : BehaviorSubject<iOffice[]> =  new BehaviorSubject<iOffice[]>([]);
  public floor$ : BehaviorSubject<iFloor[]> =  new BehaviorSubject<iFloor[]>([]);
  floor: iFloor[] = [];

  constructor(
    http: HttpClient,
    private router: Router
  ) {
    super(http);
  }

  protected override initEndpoints() {
    this.setEndpoints({
      floor: 'floor',
      office: 'office',
      workdesk: 'workdesk',
      book: 'book'
    })
  }

  private getOfficeReq() {
    return this.get<iOfficeReq>(this.buildURL('office'));
  }

  public getFloorReq(name: string) {
    return this.get<iFloorReq>(this.buildGetURL('floor', name));
  }

  private getWorkdeskReq(name: string) {
    return this.get(this.buildGetURL('workdesk', name));
    
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
    this.getOfficeReq().subscribe((offices => {
      this.offices$.next(offices.office);
    }))
  }

  getFloor(name: string) {
    this.getFloorReq(name).subscribe((floors => {
      console.log(floors);
      // this.floor$.next(floors.floor);
    }))
  }

  getWorkdesk(name: string) {
    this.getWorkdeskReq(name).subscribe((user => {
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

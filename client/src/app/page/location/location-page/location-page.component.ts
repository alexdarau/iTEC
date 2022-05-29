import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iFloor } from 'src/app/interfaces/floor.interface';
import { iOffice } from 'src/app/interfaces/offcie.interface';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.scss']
})
export class LocationPageComponent implements OnInit,  AfterViewInit {

  public offices: iOffice[] = [];
  public floors: iFloor[] = [];
  public officeGroups$: BehaviorSubject<any> = new BehaviorSubject([]);
  public isLoading: boolean = true;
  constructor(private locationService: LocationService) { 
    this.locationService.getOffice();
  }

  ngOnInit(): void {
    this.getOffice();
    setTimeout(() => {
      this.inistializeSelector();
    }, 500)
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      console.log(this.officeGroups$.value);
      this.isLoading = false;

    }, 1000)
  }

  inistializeSelector(){
    console.log(this.offices);
    const populateData: any = []
    this.offices.forEach(office => {
      console.log(office);
      let officeObj: any = {};
      this.locationService.getFloorReq(office.name).subscribe(value => {
        officeObj['name'] = office.name;
        officeObj['floors'] = value.floor;
        populateData.push(officeObj);
      });
        this.officeGroups$.next(populateData);
    })
  }

  getOffice() {  
    this.locationService.getOffice();  
    this.locationService.offices$.subscribe(value => {
      this.offices = value;
    })
    // this.locationService.getOffice()
  }

  getFloor() {
    // let name = "ana"
    // this.locationService.getFloor(name);
    this.offices.forEach(office => {
      console.log(office.name)
      this.locationService.getFloorReq(office.name).subscribe((value) => {
        this.floors = value.floor;
        console.log(value);
      })
    })
  }

  changeClient(value: any) {
    console.log(value);
  }

  getWorkdesk() {
    let name = "ana"
    this.locationService.getWorkdesk(name)
  }

  createWorkdesk() {
    let workdesk = {
      x: 10,
      y: 7,
      floorId: "62916454ff32ccb8c9ae4d95"
    }
    
    this.locationService.createWorkdesk(workdesk)
  }

  bookWorkdesk() {
    let booking = {
      startDate: "02/10/2020",
      endDate:"02/11/2020",
      id: "629169871a4657c1985a16ff",
      user_id: "6291268809fcbca7f271fe3c"
    }

    this.locationService.bookWorkdesk(booking)
  }

  getWorkdeskByDate() {
    let id = "62916454ff32ccb8c9ae4d95"
    let startDate = "02/10/2020"
    let endDate = "02/11/2020"

    this.locationService.getWorkdeskByDate(id, startDate, endDate)
  }
}

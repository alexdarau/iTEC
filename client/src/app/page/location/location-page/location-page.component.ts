import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.scss']
})
export class LocationPageComponent implements OnInit {

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
  }

  getOffice() {
    this.locationService.getOffice()
  }

  getFloor() {
    let name = "Amdaris TIMISOARA"
    this.locationService.getFloor(name)
  }

  getWorkdesk() {
    this.locationService.getWorkdesk()
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

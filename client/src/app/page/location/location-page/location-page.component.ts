import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iFloor } from 'src/app/interfaces/floor.interface';
import { iOffice } from 'src/app/interfaces/offcie.interface';
import { LocationService } from '../location.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LocationDialogComponent } from '../location-dialog/location-dialog.component';

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
  private coordX = 0;
  private coordY = 0; 
  private floorID = '';
  // public showDesk: boolean = false;

  public imageURL: string;
  constructor(private locationService: LocationService, private dialog: MatDialog) { 
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
      this.isLoading = false;
    }, 1000)
  }

  inistializeSelector(){
    const populateData: any = []
    this.offices.forEach(office => {
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
  }

  getFloor() {
    this.offices.forEach(office => {
      console.log(office.name)
      this.locationService.getFloorReq(office.name).subscribe((value) => {
        this.floors = value.floor;
      })
    })
  }

  changeClient(value: any) {
    console.log(value)
    this.imageURL = `../../../../assets/${value.map}`;
    this.floorID = value._id;
    this.getWorkdesk(this.floorID);
  }

  getWorkdesk(name: any) {
    this.locationService.getWorkdesk(name)
  }

  createMarker(e: any) {
    console.log(e.target);
    let clientHeight = document.getElementById('desk-image')?.clientHeight ?? 0;
    let clientWidth = document.getElementById('desk-image')?.clientWidth ?? 0;
    let rect = e.target.getBoundingClientRect();
    let x = clientWidth + e.clientX - rect.left; //x position within the element.
    let y = clientHeight + e.clientY - rect.top;  //y position within the element.

    const deskBtn = document.getElementById('desk');
    if (deskBtn) {
      deskBtn.style.top = y + 'px';
      deskBtn.style.left = x + 'px';
      deskBtn.style.position = 'absolute';
      deskBtn.style.display = 'block';
    }

    this.coordX = x;
    this.coordY = y;

  }


  confirm(event: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(LocationDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {
          console.log("Dialog output:", data);
          let workdesk = {
            x: this.coordX,
            y: this.coordY,
            floorId: this.floorID,
          }
          if(data) {
            this.locationService.createWorkdesk(workdesk)
          }
        }
        
        );   
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

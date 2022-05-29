import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { iOffice } from 'src/app/interfaces/offcie.interface';
import { LocationService } from '../../location/location.service';
import { AdministrationService } from '../administration.service';

@Component({
  selector: 'app-administration-page',
  templateUrl: './administration-page.component.html',
  styleUrls: ['./administration-page.component.scss']
})
export class AdministrationPageComponent implements OnInit {

  private offices: iOffice[] = [];
  constructor(
    private administrationService: AdministrationService,
    private dialog: MatDialog,
    private locationService: LocationService
    ) { 
      this.locationService.getOffice();
    }

  ngOnInit(): void {

  }

  createOffice(office: any) {
    this.administrationService.addOffice(office);
    this.getOffices();
  }
  getOffice() {
    this.administrationService.getOffice()
  }
  deleteOffice() {
    let officeId = "62924b7c604a9c5aefecddb6"
    this.administrationService.deleteOffice(officeId)
  }

  openDialog(isInput?:boolean){
    const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
          offices: this.offices,
          isInput: isInput
        }

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {
          if (data) {
            isInput ? null :  data["map"]="office-map.png";
            isInput ? this.createOffice(data) : this.administrationService.createFloorReq(data).subscribe((user => {  }))
          }
        }
    );    
  }

  getOffices() {
      this.locationService.offices$.subscribe(value => {
        this.offices = value;
      })
  }
}

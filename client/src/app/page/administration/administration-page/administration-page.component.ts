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
    this.getOffices();
  }

  createOffice(office: any) {
    this.administrationService.addOffice(office);
    this.getOffices();
  }
  getOffice() {
    this.administrationService.getOffice()
  }
  deleteOffice(officeId: any) {
    this.administrationService.deleteOffice(officeId)
  }

  openDialog(isInput: boolean, isSelect: boolean){
    const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
          offices: this.offices,
          isInput: isInput,
          isSelect: isSelect
        }

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {
          if (data) {
            console.log(data);
            isInput ? null :  data["map"]="office-map.png";
            isInput ? this.createOffice(data) : isSelect ? this.deleteOffice(data.selectedData) : this.administrationService.createFloorReq(data).subscribe((user => {  }))
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

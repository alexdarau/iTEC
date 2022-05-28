import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { AdministrationService } from '../administration.service';

@Component({
  selector: 'app-administration-page',
  templateUrl: './administration-page.component.html',
  styleUrls: ['./administration-page.component.scss']
})
export class AdministrationPageComponent implements OnInit {

  constructor(
    private administrationService: AdministrationService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  createOffice() {
    let office = {
      name: "Amdaris1"
    }
    this.administrationService.addOffice(office)
  }
  getOffice() {
    this.administrationService.getOffice()
  }
  deleteOffice() {
    let officeId = "62924b7c604a9c5aefecddb6"
    this.administrationService.deleteOffice(officeId)
  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
          offices: ['this', 'is', 'sparta']
        }

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => console.log("Dialog output:", data)
    );    
  }
}

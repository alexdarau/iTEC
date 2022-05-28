import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../administration.service';

@Component({
  selector: 'app-administration-page',
  templateUrl: './administration-page.component.html',
  styleUrls: ['./administration-page.component.scss']
})
export class AdministrationPageComponent implements OnInit {

  constructor(private administrationService: AdministrationService) { }

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
}

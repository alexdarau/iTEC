import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
  }

  createOffice() {
    let office = {
      name: "Amdaris1"
    }
    this.dashboardService.addOffice(office)
  }
  getOffice() {
    this.dashboardService.getOffice()
  }
  deleteOffice() {
    let officeId = "629248fe604a9c5aefecddb1"
    this.dashboardService.deleteOffice(officeId)
  }
}

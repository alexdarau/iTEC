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

  getAllOffices(){
    this.dashboardService.getOffice()
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationPageComponent } from '../reservation-page/reservation-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ReservationPageComponent }
];

@NgModule({
  declarations: [
    ReservationPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
  exports: [RouterModule],
})
export class ReservationModule { }

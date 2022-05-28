import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationPageComponent } from '../location-page/location-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LocationPageComponent }
];


@NgModule({
  declarations: [
    LocationPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
  exports: [RouterModule],
})
export class LocationModule { }

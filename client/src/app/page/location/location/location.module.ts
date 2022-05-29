import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationPageComponent } from '../location-page/location-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

const routes: Routes = [
  { path: '', component: LocationPageComponent }
];


@NgModule({
  declarations: [
    LocationPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule
  ],
  providers: [],
  exports: [RouterModule],
})
export class LocationModule { }

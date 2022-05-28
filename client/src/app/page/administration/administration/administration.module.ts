import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationPageComponent } from '../administration-page/administration-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  { path: '', component: AdministrationPageComponent }
];


@NgModule({
  declarations: [
    AdministrationPageComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class AdministrationModule { }

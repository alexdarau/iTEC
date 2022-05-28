import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationPageComponent } from '../administration-page/administration-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AdministrationPageComponent }
];


@NgModule({
  declarations: [
    AdministrationPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class AdministrationModule { }

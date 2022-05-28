import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: '', component: RegisterPageComponent }
];

@NgModule({
  declarations: [
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
  exports: [RouterModule],
})
export class RegisterModule { }

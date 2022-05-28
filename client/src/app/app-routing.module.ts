import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from './app.guard';
import { LoginPageComponent } from './page/login/login-page/login-page.component';
import { RegisterPageComponent } from './page/register/register-page/register-page.component';
import { RegisterModule } from './page/register/register.module';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent},
  { 
    path: 'dashboard',
    canActivate: [AppGuard],
    loadChildren: () => import('./page/dashboard/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { 
    path: 'map',
    canActivate: [AppGuard],
    loadChildren: () => import('./page/dashboard/dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

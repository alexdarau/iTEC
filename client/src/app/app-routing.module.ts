import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from './app.guard';
import { LoginPageComponent } from './page/login/login-page/login-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'register', loadChildren: () => import('./page/register/register.module').then(m => m.RegisterModule)},
  { 
    path: 'dashboard',
    canActivate: [AppGuard],
    loadChildren: () => import('./page/dashboard/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { 
    path: 'location',
    canActivate: [AppGuard],
    loadChildren: () => import('./page/location/location/location.module').then(m => m.LocationModule)
  },
  { 
    path: 'administration',
    canActivate: [AppGuard],
    loadChildren: () => import('./page/administration/administration/administration.module').then(m => m.AdministrationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

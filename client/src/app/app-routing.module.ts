import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from './app.guard';
import { LoginPageComponent } from './page/login/login-page/login-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { 
    path: 'dashboard',
    canActivate: [AppGuard],
    loadChildren: () => import('./page/dashboard/dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

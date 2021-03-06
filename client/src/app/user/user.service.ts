import { HttpClient } from '@angular/common/http';
import { Injectable,EventEmitter } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
// import { EventEmitter } from 'stream';
import { ApiBase } from '../api-base';
import { iUser, iUserReq } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiBase {

  public loginEmitter: EventEmitter<boolean> = new EventEmitter();

  public logoutEmitter: EventEmitter<boolean> = new EventEmitter();

  // public currentUser$: BehaviorSubject<iUser> = new BehaviorSubject<iUser>(undefined);
  public currentUser$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  
  constructor(
    http: HttpClient,
    private router: Router
  ) { 
    super(http);
    setTimeout(() => {
      this.refreshCurrentUser();
    })
  }

  refreshCurrentUser() {
    let userLocalStorage: any  = localStorage.getItem("USER");
    let user = JSON.parse(userLocalStorage);
    this.currentUser$.next(user);
  }

  // Initialize the available routes
  protected override initEndpoints() {
    this.setEndpoints({
      register: 'auth/register',
      login: 'auth/login'
    })
  }

  private loginReq (loginUserCredentials: any) {
    return this.post<iUserReq>(this.buildURL('login'), loginUserCredentials, true);
  }

  public login(loginUserCredentials: any) {
    this.loginReq(loginUserCredentials).subscribe((user => {
      localStorage.setItem("USER_TOKEN",user.token);
      localStorage.setItem("USER",JSON.stringify(user.user));
      this.currentUser$.next(user.user);
      this.router.navigate(['/dashboard'])
    }))
  }

  public logout() {
    this.currentUser$.next(null);
    localStorage.removeItem("USER_TOKEN");
    localStorage.removeItem("USER");
    this.router.navigate(['/'])
  }

  public getAllowedRoutes() {
    let routes = []

    switch (this.currentUser$.value.role) {
      case 'admin':
        routes = UserService.AdminAllowedRoutes;
        break;
      case 'employee': 
        routes = UserService.EmployeeAllowedRoutes;
        break;
      default:
        throw new Error("Unknown type");
    }

    return routes;
  }


  private static AdminAllowedRoutes = [
    {title: 'Dashboard', route: '/dashboard', icon:'home'},
    {title: 'Location', route: '/location', icon:'map'},
    {title: 'Administration', route: '/administration', icon:'settings_system_daydream'},
  ]

  private static EmployeeAllowedRoutes = [
    {title: 'Dashboard', route: '/dashboard', icon:'home'},
    {title: 'Location', route: '/location', icon:'map'},
    {title: 'Calendar', route: '/calendar', icon:'today'},
    {title: 'Reservations', route: '/reservations', icon:'home'},
  ]
}

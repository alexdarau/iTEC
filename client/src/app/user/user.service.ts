import { HttpClient } from '@angular/common/http';
import { Injectable,EventEmitter } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
// import { EventEmitter } from 'stream';
import { ApiBase } from '../api-base';
import { iUser } from './user.interface';

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
  }

  // Initialize the available routes
  protected override initEndpoints() {
    this.setEndpoints({
      register: 'auth/register',
      login: 'auth/login'
    })
  }

  private loginReq (loginUserCredentials: any) {
    return this.post(this.buildURL('login'), loginUserCredentials, {withCredentials: true});
  }

  public login(loginUserCredentials: any) {
    this.loginReq(loginUserCredentials).subscribe((user => {
      
      this.currentUser$.next(user);
      this.router.navigate(['/dashboard'])
    }))
  }

  public logout() {
    this.currentUser$.next(null);
    this.router.navigate(['/login'])
  }

  public getAllowedRoutes() {
    let routes = []

    switch (this.currentUser$.value.user.role) {
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
    {title: 'Dashboard', route: '/dashboard'},
    {title: 'Location', route: '/location'},
    {title: 'Administration', route: '/administration'},
  ]

  private static EmployeeAllowedRoutes = [
    {title: 'Dashboard', route: '/dashboard'},
    {title: 'Location', route: '/location'},
    {title: 'Calendar', route: '/calendar'},
    {title: 'Reservations', route: '/reservations'},
  ]
}

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
    private urlSerializer : UrlSerializer,
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
    return this.post(this.buildURL('login'), loginUserCredentials);
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
    // let routes$: BehaviorSubject<any> = new BehaviorSubject<any>([]);


    switch (this.currentUser$.value.role) {
      case 'admin':
        routes = UserService.AdminAllowedRoutes;
        // routes$.next(UserService.AdminAllowedRoutes)
        break;
      case 'client': 
        routes = UserService.ClientAllowedRoutes;
        // routes$.next(UserService.ClientAllowedRoutes)
        break;
      default:
        throw new Error("Unknown type");
    }

     this.currentUser$.subscribe(currentUser => {
      // switch (currentUser.role) {
      //   case 'admin':
      //     // routes = UserService.AdminAllowedRoutes;
      //     routes$.next(UserService.AdminAllowedRoutes)
      //     break;
      //   case 'client': 
      //     // routes = UserService.ClientAllowedRoutes;
      //     routes$.next(UserService.ClientAllowedRoutes)
      //     break;
      //   default:
      //     throw new Error("Unknown type");
      // }
    })

    return routes;
  }


  private static AdminAllowedRoutes = [
    {title: 'Map', route: '/map'}
  ]

  private static ClientAllowedRoutes = [
    {title: 'Dashboard', route: '/dashboard'}
  ]
}

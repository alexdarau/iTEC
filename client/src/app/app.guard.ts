import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return new Observable(sub =>{
      const routesAlwaysAvailable = [
        '/login', // Root
        '/error' // error page
      ];

      //get current user
      let userSub = this.userService.currentUser$.subscribe(() =>{

        let userLocalStorage: any  = localStorage.getItem("USER");
        let user = JSON.parse(userLocalStorage);

        if (user === undefined) {
          //still loading
          return;
        }

        // we received our answer
        // userSub?.unsubscribe();

        // user logged out
        if(user === null) {
          sub.next(false);
          sub.complete();
          return;
        }


        // user logged in
        let currentURL = route.pathFromRoot.map(v => v.url.map(segment => segment.toString()).join('/')).join('/');

        // If navigate to an ALWAYS Available route..
        if (routesAlwaysAvailable.indexOf(currentURL) > -1) {
          sub.next(true);
          sub.complete();
          this.router.navigate(['error/404'])
          return;
        }

        // Check whether the requested route is enabled for the current user
        let found = this.userService.getAllowedRoutes().find( (v) => { return currentURL.includes(v?.route) }) !== undefined;
      
        if (!found) {
          sub.next(false);
          sub.complete();
          return;
        }
  
        sub.next(true);
        sub.complete();
      })

    })
  }
  
}

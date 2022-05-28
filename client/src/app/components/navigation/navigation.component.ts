import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { NavigationItem } from './navigation-intem.interface';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  public availableRoutes: NavigationItem[] = [];

  public userCurrentSub: Subscription | undefined;

  private static defaultRoutes = [
    {title: 'Dashboard', route: '/dashboard'}
  ]

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    this.userCurrentSub = this.userService.currentUser$.subscribe( (currentUser) => {
      if (currentUser === undefined) {
        return;
      }

      if (currentUser === null) {
        this.availableRoutes = [...NavigationComponent.defaultRoutes];
        return;
      }

      this.availableRoutes = [...this.userService.getAllowedRoutes()]
    })
  }

  ngOnDestroy(): void {

    if(this.userCurrentSub && !this.userCurrentSub.closed) {
      this.userCurrentSub.unsubscribe();
    }
  }

  getSelectedClass(navItem: NavigationItem) {
    if (this.router.url === navItem.route) {
      return 'nav-link--selected'
    }

    return ''
  }

}

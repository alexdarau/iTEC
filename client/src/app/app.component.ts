import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {UserService} from './user/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'client';
  public userCurrentSub: Subscription | undefined;
  public hideNavigation: boolean = false;

  constructor( private userService: UserService) {

  }

  ngOnInit(): void {
    this.userCurrentSub = this.userService.currentUser$.subscribe( (currentUser) => {
      console.log(currentUser)
      if (currentUser === undefined) {
        this.hideNavigation = false;
        return;
      }

      if (currentUser === null) {
        this.hideNavigation =false;
        return;
      }

      this.hideNavigation = true;
    })
  }

  ngOnDestroy(): void {
    if(this.userCurrentSub && !this.userCurrentSub.closed) {
      this.userCurrentSub.unsubscribe();
    }
  }
  }


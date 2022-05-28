import { Injectable } from '@angular/core';
import { ApiBase } from 'src/app/api-base';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends ApiBase {

  constructor(
    http: HttpClient,
    private router: Router, private userService: UserService
  ) {
    super(http);
  }

  // Initialize the available routes
  protected override initEndpoints() {
    this.setEndpoints({
      register: 'auth/register'
    })
  }

  private registerReq(data: any) {
    return this.post(this.buildURL('register'), data);

  }

  register(data: string) {
    this.registerReq(data).subscribe((user => {

      this.userService.currentUser$.next(user);
      this.router.navigate(['/dashboard'])
    }))
    console.log(data)
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public userForm: any;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {

    this.userForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  login() {
    this.userService.login( this.userForm.value)
  }

  goToRegister() {
    this.router.navigate(["/dashboard"])
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { RegisterService } from '../register.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  public userForm: any;

  constructor(private router: Router, private registerService: RegisterService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl('')
    });
  }

  register() {
    this.registerService.register(this.userForm.value)
  }

  goToLogin() {
    this.router.navigate(["/dashboard"])
  }

}

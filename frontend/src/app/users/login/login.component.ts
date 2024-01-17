import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../users.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UsersService,
    
    // private translateService: TranslateService,
    private route: Router
  ) { }

  ngOnInit() {
    
    const isLoggedIn = this.userService.getCurrentUser();
    if (!isLoggedIn)
      return this.route.navigate(['/']);
  }

  onLogin(form: NgForm) {
    
    const user: User = {
        email: form.value.email,
        password: form.value.password
    }

    this.userService.login(user).subscribe((data: any ) => {
      switch (data.api_status) {
        case 1:
          'login successfully';
          // set in localStorage
          this.userService.setCurrentUser(data.userInfo);
          break;
        case 2:
          'check you email or password'
          break;
        case 3:
          'user dose not exist please Sign up';
          break;

      }
    })
  }

}

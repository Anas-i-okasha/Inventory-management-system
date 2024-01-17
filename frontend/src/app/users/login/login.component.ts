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
    console.log('anas')
  }

  onLogin(form: NgForm) {
    
    const user: User = {
        email: form.value.email,
        password: form.value.password
    }

    this.userService.login(user).subscribe((data: any ) => {
      switch (data.api_status) {
        case 1:
          'login successfully'
          this.userService.setCurrentUser(data.userInfo);
          break;
        case 2:
          ''
          break;
        case 3:
          ''
          break;

      }
    })
  }

}

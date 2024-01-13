import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    console.log('anas')
  }

  onLogin(form: NgForm) {
    const email    = form.value.email;
	const password = form.value.password;

    this.userService.login({email, password}).subscribe((data: any)=>{
      console.log(data);
    })
  }

}

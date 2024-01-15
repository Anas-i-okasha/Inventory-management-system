import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../users.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UsersService,
    private http: HttpClient,
    private route: Router
  ) { }

  ngOnInit(): void {
    console.log('anas')
  }

  onLogin(form: NgForm) {
    // const email    = form.value.email;
	// const password = form.value.password;
    const user = {
        email: form.value.email,
        password: form.value.password
    }
    this.http.post('http://localhost:5000/user/login', user, {withCredentials: true}).subscribe(res => this.route.navigate(['/']))
    // this.userService.login({email, password}).subscribe((data: any )=>{
    //   console.log(data);
    //   localStorage.setItem('user', data[0]);
    // })
  }

}

import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { NavigationService } from 'src/app/service/navigation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any = {};
  constructor(
    private userService: UsersService,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {

  }

  registerRequest() {
    this.userService.userRegister(this.user).subscribe((res) => {
      if (res == 1)
        return 'success message'
      return 'global error message'
    })

  }

  goBack() {
    this.navigationService.goBack('/');
  }
}

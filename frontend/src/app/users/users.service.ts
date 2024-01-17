import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserInfo } from './user.model';
// import * as config from '../../../../../../config';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseURL = 'http://localhost:5000/user';

  constructor(
    private httpClient: HttpClient
  ) {}
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject({});
	public currentUser = this.currentUserSubject.asObservable();

  setCurrentUser(user: UserInfo) {
		if (Object.keys(user).length > 0) {
			user.full_name = user.first_name + ' ' + user.last_name;
		}
		localStorage.setItem('userInfo', JSON.stringify(user));
		this.currentUserSubject.next(user);
	}


  login(user: User) {
    return this.httpClient.post(`${this.baseURL}/login`, user, {withCredentials: true});
  }
}

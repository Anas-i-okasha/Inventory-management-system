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

  getCurrentUser() {
		let info = this.currentUserSubject?.value;
		if (!info || !info.id) {
			const userInfo = localStorage.getItem('userInfo') || '';
			if (!userInfo) { return false; }
			info = JSON.parse(userInfo);

			if (info && info.id) {
				this.currentUserSubject.next(info);
			}
		}
		return info;
	}


  login(user: User) {
    return this.httpClient.post(`${this.baseURL}/login`, user, {withCredentials: true});
  }

  userRegister(user: UserInfo) {
    return this.httpClient.post(`${this.baseURL}/register`, user);
  }
}

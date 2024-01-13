import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
// import * as config from '../../../../../config';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseURL = 'http://localhost:5000/user';

  constructor(
    private httpClient: HttpClient
  ) {}

  login(user: any): Observable<any> {
    return this.httpClient.post(this.baseURL + '/login', user);
  }
}

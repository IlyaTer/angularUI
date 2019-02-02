import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getUserURL: string = 'http://localhost:8080/get/user'

  public login: number = 1;

  public user: User;

  public authToken: string;

  constructor(private http: HttpClient) {
    console.log('User service here');
  }

  loginUser(user: User) {
    let input = new FormData();
    input.append('username', user.login);
    input.append('password', user.password);
    return this.http.post<any>('http://localhost:8080/login',
      input);

  }

  createUser(login: string, password: string): any {
    let user: User = {
      id: 0,
      login: login,
      password: password
    };
    return this.http.post<any>('http://localhost:8080/add/user', user);
  }

  getUserLogin() {
    console.log(this.user);
    return this.user.login;
  }
}//end User service

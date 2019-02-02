import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { withLatestFrom } from 'rxjs/operators';
import { isUndefined, isNull } from 'util';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'Article App';
  test: number = 0;

  constructor(public userService: UserService,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit() {
    console.log('I am alive!');
    let auth = localStorage.getItem('MyAngApp');
    if (!isNull(auth)) {
      this.userService.authToken = localStorage.getItem('MyAngApp');
      this.userService.login = 0;
      let httpOptions = {
        headers: new HttpHeaders({
          'Authorization': auth
        })
      };
      this.http.get('http://localhost:8080/get/userInfo', httpOptions).subscribe(data => {
        let user: User = {
          login: '',
          password: '',
          id: 0
        }
        user.id = data['id'];
        user.login = data['login'];
        user.password = data['password'];
        this.userService.user = user;
        localStorage.setItem('UserLogin', user.login);
      });
    }
  }
  onLogout() {
    this.userService.login = 1;
    this.userService.user = null;
    this.userService.authToken = null;
    localStorage.removeItem('MyAngApp');
    localStorage.removeItem('UserLogin');
    this.router.navigateByUrl('/');
  }

  getLogInf(): number {
    return this.userService.login;
  }

  getUserInf(): any {
    return this.userService.user;
  }

  onSelect() {
    console.log('test');
    this.test = 1;
  }

  onSelect1() {
    console.log('test');
    this.test = 0;
  }

}

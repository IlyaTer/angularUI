import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../user';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error;

  constructor(public userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router, private dialog: MatDialog) {
    console.log("login here constr");
  }

  ngOnInit() {
    console.log("login here");
  }

  onLogin(login: string, password: string) {

    this.error = null;
    if (login.length > 0 && password.length > 0) {

      let user: User = {
        id: null,
        login: login,
        password: password
      };
      this.userService.loginUser(user).subscribe(resp => {
        console.log(resp['Authorization']);
        if (resp['Authorization']) {
          this.userService.login = 0;
          this.userService.user = user;
          this.userService.authToken = resp['Authorization'];
          localStorage.setItem('MyAngApp', resp['Authorization']);
          localStorage.setItem('UserLogin', login);
          this.router.navigateByUrl('/');
        } else {
          this.error = 'No such User!';
          this.openDialog();
        }
      }, error => {
        this.error = 'No such user!';
        this.openDialog();
      });
    }
    else {
      this.error = '';
      if (login.length == 0) {
        this.error += 'Login can\' be blank\n, ';
      }
      if (password.length == 0) {
        this.error += 'Password can\' be blank';
      }
      this.openDialog();
    }

  }//end Login

  openDialog() {
    this.dialog.open(MessageDialogComponent, {
      data: {
        message: this.error
      }
    });
  }//end openDialog
}

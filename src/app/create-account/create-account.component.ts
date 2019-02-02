import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { isNull } from 'util';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  message;
  error;

  constructor(public userService: UserService,private dialog: MatDialog) { }

  ngOnInit() {
  }

  onCreate(login: string, password: string) {
    this.message = null;
    this.error = null;
    if (login.length > 0 && password.length > 0) {
      if (this.message != 'User was created') {
        this.userService.createUser(login, password).subscribe(
          data => {
            if (data['status'] === 0) {
              this.error = 'User was created';
              this.message = 'User was created';
              this.openDialog();
            } else {
              this.error = data['description'];
              this.openDialog();
            }
          }//end regex
        );
      } else {
        this.error = 'User was created already';
        this.openDialog();
      }
    }
    else {
      this.error = '';
      if (login.length == 0) {
        this.error += 'Login can\' be blank\n , ';
      }
      if (password.length == 0) {
        this.error += 'Password can\' be blank';
      }
      this.openDialog();
    }
    console.log('end on Create');
  }//end onCreate

  openDialog() {
    this.dialog.open(MessageDialogComponent, {
      data: {
        message: this.error
      }
    });
  }

}//end Create

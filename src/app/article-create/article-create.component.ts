import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { UserService } from '../user.service';
import {Router} from "@angular/router";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {

  error: string;

  constructor(private userService: UserService,
    private articleService: ArticleService,
    private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.error = null;
  }

  create(name: string, topic: string, text: string) {
    this.error = null;
    if (name.length != 0 && topic.length != 0 && text.length != 0) {
      let article: Article = {
        id: 0,
        name: name,
        topic: topic,
        text: text,
        author: this.userService.user.login
      };
      console.log(article);

      this.articleService.addArticle(article).subscribe(data => {
        console.log(data['status'])
      });
      this.router.navigateByUrl('/');
    } else {
      this.error = '';
      if (name.length == 0) {
        this.error += 'Name can\'t be blank\n, ';
      }
      if (topic.length == 0) {
        this.error += 'Topic can\'t be blank\n, ';
      }
      if (text.length == 0) {
        this.error += 'Text can\'t be blank\n';
      }
      this.openDialog();
    }//end else
  }//end create

  openDialog() {
    this.dialog.open(MessageDialogComponent, {
      data: {
        message: this.error
      }
    });
  }//end openDialog

}

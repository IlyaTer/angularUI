import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ArticleService } from '../article.service';
import { UserService } from '../user.service';
import { Router } from "@angular/router"
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

import { Article } from '../article';
import { isNull } from 'util';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  error: string;
  @Input() article: Article;
  comments: Array<any>;
  showComments: number = 0;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private location: Location, private articleService: ArticleService,
    private router: Router, private commentService: CommentService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.error = null;
    this.getArticle();
  }

  getArticle(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.articleService.getArticleById(id).subscribe(data => {
      this.article = {
        id: data['id'],
        name: data['name'],
        topic: data['topic'],
        text: data['text'],
        author: data['author']
      };
      this.comments = data['comments'];
    });
  }

  onShow() {
    this.showComments = 1;
  }

  onHide() {
    this.showComments = 0;
  }

  addComment(comment: string) {
    this.error = null;
    if (comment.length != 0) {
      let commentIn = {
        author: this.userService.user.login,
        text: comment, id: 0, article: this.article.id
      };

      this.articleService.addComment(commentIn).subscribe(
        data => {
          commentIn.id = data['description'];
          if (!isNull(commentIn.id)) {
            this.comments.push(commentIn);
          }
        }
      );
    } else {
      this.error = 'Comment can\'t be blank';
      this.openDialog();
    }
  }//end addComment

  removeComment(comment) {
    console.log(comment);
    this.commentService.removeComment(comment.id).subscribe(
      data => {
        console.log(data['status']);
        if (this.comments.length === 1) {
          this.comments.pop();
        }
        else {
          if (this.comments.indexOf(comment) === 0) {
            this.comments.splice(0, 1);
          }
          else {
            this.comments.splice(this.comments.indexOf(comment), 1);
          }
        }//end if
      }//end regx
    );
  }//end removeComent

  editArticle(id: number) {
    this.router.navigateByUrl('article-edit/' + id);
  }

  openDialog() {
    this.dialog.open(MessageDialogComponent, {
      data: {
        message: this.error
      }
    });
  }//end openDialog

}

import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';


@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {

  @Input() article: Article;
  error: string;

  constructor(private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router, private location: Location,
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
    });
  }
  onSave() {
    this.articleService.updateArticle(this.article).subscribe(
      data=>{
        if(data['status'] === 0){
          this.error = 'Save successful';
          this.openDialog();
        }
      }
    );
  }

  onCancel() {
    this.location.back();
  }

  openDialog() {
    this.dialog.open(MessageDialogComponent, {
      data: {
        message: this.error
      }
    });
  }//end openDialog

}

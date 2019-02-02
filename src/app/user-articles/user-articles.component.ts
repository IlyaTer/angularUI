import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ArticleService } from '../article.service';
import {Router} from "@angular/router";
import { Article } from '../article';

@Component({
  selector: 'app-user-articles',
  templateUrl: './user-articles.component.html',
  styleUrls: ['./user-articles.component.css']
})
export class UserArticlesComponent implements OnInit {

  articles;

  constructor(private user: UserService, private articleService: ArticleService,
    private router: Router) { }

  ngOnInit() {
    this.articleService.getArticlesByUser(localStorage.getItem('UserLogin')).subscribe(data => {
      this.articles = data;
    });
  }

  onSelect(article: Article): void {
    this.router.navigateByUrl('article-detail/'+article.id);
  }

}

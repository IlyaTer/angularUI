import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { AppComponent } from '../app.component';
import { UserService } from '../user.service';
import { ArticleService } from '../article.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles;

  constructor(private appComp: AppComponent,
    private user: UserService, private articleService: ArticleService,
    private router: Router) {
      console.log('articles here constr');
     }

  ngOnInit() {
    this.articleService.getArticles().subscribe(data => {
      this.articles = data;
    });
    console.log('articles here');
  }

  onCick(): void {
    this.appComp.title = "null";
    this.user.login = 0;
    this.articleService.getArticleById(1);
  }

  onSelect(article: Article): void {
    this.router.navigateByUrl('article-detail/'+article.id);
  }

}

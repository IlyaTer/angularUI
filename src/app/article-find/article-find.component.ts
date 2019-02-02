import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Router} from "@angular/router";
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { Article } from '../article';
import { ArticleService } from '../article.service'; 

@Component({
  selector: 'app-article-find',
  templateUrl: './article-find.component.html',
  styleUrls: ['./article-find.component.css']
})
export class ArticleFindComponent implements OnInit {

  articles$: Observable<Article[]>;
  private searchTerms = new Subject<string>();

  constructor(private articleService:ArticleService,
    private router: Router) { }

  ngOnInit() {
    this.articles$ = this.searchTerms.pipe(
      debounceTime(300), 
      distinctUntilChanged(),
      switchMap((term: string) => this.articleService.searchByMatches(term)),
    );
  }//end ngOnInit

  search(term: string): void {
    this.searchTerms.next(term);
  }

  onSelect(article: Article): void {
    this.router.navigateByUrl('article-detail/'+article.id);
  }
}

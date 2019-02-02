import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Article } from './article';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private getUrl: string = 'http://localhost:8080/get/article/';

  constructor(private http: HttpClient,
    private userService: UserService) { }

  getArticleById(id: number) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.userService.authToken
      })
    };

    return this.http.get(this.getUrl + id);
  }

  getArticles() {
    return this.http.get('http://localhost:8080/get/article');
  }

  addArticle(article: Article) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.userService.authToken
      })
    };
    return this.http.post('http://localhost:8080/add/article/', article, httpOptions);
  }

  addComment(comment: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.userService.authToken
      })
    };
    return this.http.post('http://localhost:8080/add/comment/', comment, httpOptions);
  }

  updateArticle(article: Article) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.userService.authToken
      })
    };
    return this.http.put('http://localhost:8080/update/article/', article, httpOptions);
  }

  searchByMatches(term: string): Observable<Article[]> {
    if (!term.trim()) {
      return of([]);
    }//add url and add rest controller
    return this.http.get<Article[]>('http://localhost:8080/get/articlesByMatches/'+term).pipe(
      tap(_ => console.log(`found articles matching "${term}"`))
    );
  }//end searchByMatches

  getArticlesByUser(user: string){
    return this.http.get('http://localhost:8080/get/articlesByUser/'+user);
  }
}

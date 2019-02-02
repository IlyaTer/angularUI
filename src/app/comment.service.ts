import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient,
    private userService: UserService) { }

  getCommentsByArticle(articleId: number) {
    //add code
  }

  addComment() {
    //add code
  }

  removeComment(id: number)
  {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.userService.authToken
      })
    };
    return this.http.delete('http://localhost:8080/delete/comment/'+id, httpOptions);
  }
}

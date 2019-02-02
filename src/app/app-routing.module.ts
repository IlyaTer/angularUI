import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleFindComponent } from './article-find/article-find.component';
import { UserArticlesComponent } from './user-articles/user-articles.component';


const routes: Routes = [
  { path: '', component: ArticlesComponent },
  { path: 'article-detail/:id', component: ArticleDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-user', component: CreateAccountComponent },
  { path: 'article-edit/:id', component: ArticleEditComponent },
  { path: 'article-create', component: ArticleCreateComponent },
  { path: 'article-find', component: ArticleFindComponent },
  { path: 'user-articles', component: UserArticlesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

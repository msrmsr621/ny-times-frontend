import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dynamic/dashboard/dashboard.component';
import { DetailsNewsComponent } from './dynamic/details-news/details-news.component';
import { LandingPageComponent } from './static/landing-page/landing-page.component';
import { LoginComponent } from './static/login/login.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './static/not-found/not-found.component';
import { RegisterComponent } from './static/register/register.component';
import { SearchArticleListComponent } from './dynamic/search-article-list/search-article-list.component';
import { TopStoriesListComponent } from './dynamic/top-stories-list/top-stories-list.component';

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "articles", component: DashboardComponent },
  { path: "top-stories/:category/:artcileType", component: DashboardComponent, },
  { path: "articles/search", component: SearchArticleListComponent },
  { path: "details-news", component: DetailsNewsComponent, },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

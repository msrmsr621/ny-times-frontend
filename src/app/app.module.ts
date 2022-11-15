import { APP_CONFIG, AppConfig } from './app.config';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  MultilevelMenuService,
  NgMaterialMultilevelMenuModule,
  ɵb
} from "ng-material-multilevel-menu";

import { AngularMaterialModule } from './angular-material.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './dynamic/app-header/app-header.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './dynamic/dashboard/dashboard.component';
import { DetailsNewsComponent } from './dynamic/details-news/details-news.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LandingPageComponent } from './static/landing-page/landing-page.component';
import { LoginComponent } from './static/login/login.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NotFoundComponent } from './static/not-found/not-found.component';
import { RegisterComponent } from './static/register/register.component';
import { RouteGuardService } from './services/route-guard.service';
import { ToastrModule } from 'ngx-toastr';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { TopStoriesListComponent } from './dynamic/top-stories-list/top-stories-list.component';
import { SearchArticleListComponent } from './dynamic/search-article-list/search-article-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NotFoundComponent,
    DetailsNewsComponent,
    AppHeaderComponent,
    TopStoriesListComponent,
    SearchArticleListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FlexLayoutModule,
    NgMaterialMultilevelMenuModule,
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    ɵb,
    MultilevelMenuService,
    authInterceptorProviders,
    RouteGuardService,
    { provide: APP_CONFIG, useValue: AppConfig },
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

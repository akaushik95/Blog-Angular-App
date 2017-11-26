import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { HomepageComponent } from './homepage/homepage.component';
import {BlogserviceService} from "./blogservice/blogservice.service";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {LoginService} from "./loginservice/login.service";
import { FavouriteBlogComponent } from './favourite-blog/favourite-blog.component';
import {UnmarkService} from "./unmarkservice/unmark.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    HomepageComponent,
    FavouriteBlogComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule
  ],
  providers: [BlogserviceService, LoginService, UnmarkService],
  bootstrap: [AppComponent]
})
export class AppModule { }

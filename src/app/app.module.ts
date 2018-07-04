import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AlertModule } from 'ngx-bootstrap';
import { AddComponent } from './add/add.component';
import { ManuallyAddComponent } from './manually-add/manually-add.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    AddComponent,
    ManuallyAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    AlertModule,
    HttpClientModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

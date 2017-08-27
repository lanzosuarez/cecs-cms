import { StyleHelperService } from './style-helper.service';
import { ResourceService } from './resource.service';
import { Routing } from './app.routing';
import { LoginService } from './login/login.service';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    Routing
  ],
  providers: [
    LoginService, 
    ResourceService, 
    StyleHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

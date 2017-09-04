import { LoginGuardService } from './admin/services/login.guard.service';
import { StyleHelperService } from './admin/services/style-helper.service';
import { ResourceService } from './admin/services/resource.service';
import { LoginService } from './admin/services/login.service';
import { Routing } from './app.routing';
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
    StyleHelperService,
    LoginGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

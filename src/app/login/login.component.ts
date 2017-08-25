import { StyleHelperService } from './../style-helper.service';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';

import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { LoginService } from './login.service';
import { Admin } from './../models/admin';
import { CODES } from './../models/vars';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})


export class LoginComponent implements AfterViewInit {

  loginForm: FormGroup;

  @ViewChild('errorMessage') errorMessage: ElementRef;
  @ViewChild('spinner') spinner: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private s: StyleHelperService
  ) {
    this.initializeLoginForm();
  }

  ngAfterViewInit() {
    //hide the error message
    this.hideErrorMessage();
    this.hideSpinner();
  }

  initializeLoginForm() {
    //initialize login DATA DRIVEN FORM
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  onSubmit() {
    //execite login
    this.fireLogin();
  }


  fireLogin() {
    //assign form value to cred
    const cred: Admin = this.loginForm.value;

    //show spinner for loading
    this.showSpinner();

    //then login
    // this.loginService.onLogin(cred)
    //   .subscribe(
    //   r => this.onLoginData(r),
    //   err => this.showErrorMessage(err)
    //   );
    this.onLoginData("");

  }

  //handle data response here
  onLoginData(r) {
    this.hideSpinner();//hide spinner
    this.router.navigate(['profile']);//then navigate to dash board
  }

  showErrorMessage(err) {
    //show error message
    this.s.hideElement(this.errorMessage, false);
    
    //check code for proper error message
    this.checkCodes(err.code);

    //then hide spinner
    this.hideSpinner();
  }

  showSpinner() {
    //show spinner, true to make it inline
    this.s.hideElement(this.spinner, false, true);
  }

  hideSpinner() {
    //hide spinner
    this.s.hideElement(this.spinner, true);
  }

  hideErrorMessage() {
    //hide error message
    this.s.hideElement(this.errorMessage, true);
  }

  checkCodes(code) {
    //response code checking
    if (code === CODES.CODE_AUTH_ERROR) {
      this.errorMessage.nativeElement.textContent = 'Invalid username/password';
    } else if (code === CODES.CODE_SERVER_ERROR) {
      this.errorMessage.nativeElement.textContent = 'Something went shit';
    }
  }

}


import { StyleHelperService } from './../admin/services/style-helper.service';
import { ResourceService } from './../admin/services/resource.service';
import { LoginService } from './../admin/services/login.service';
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
  Validators,
  NgForm
} from '@angular/forms';

import { Admin } from './../models/admin';
import { CODES } from './../models/vars';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements AfterViewInit {

  mode: number = 0;
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;

  loginSubscription: Subscription;
  forgotPasswordSubscription: Subscription;

  @ViewChild('errorMessage') errorMessage: ElementRef;
  @ViewChild('spinner') spinner: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private rs: ResourceService,
    private s: StyleHelperService
  ) {
    this.initializeLoginForm();
    this.initializePasswordForm();
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

  initializePasswordForm() {
    //initialize login DATA DRIVEN FORM
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });

  }

  onSubmit() {
    //execite login
    this.fireLogin();
  }

  setMode(mode: number) {
    this.mode = mode;

    this.unSubscribeToLogin();
    this.hideErrorMessage();
    this.initializeLoginForm();
    this.initializePasswordForm();

  }


  fireLogin() {
    //assign form value to cred
    const cred: Admin = this.loginForm.value;
    console.log(cred);

    //show spinner for loading
    this.showSpinner();

    //then login
    this.loginSubscription = this.loginService.onLogin(cred)
      .subscribe(
      r => this.onLoginData(r),
      err => this.showErrorMessage(err)
      );
  }

  onSendNewPassword() {
    const cred = this.forgotPasswordForm.value;

    this.showSpinner();

    this.forgotPasswordSubscription =
      this.loginService.forgotPassword(cred)
        .subscribe(
        r => {
          this.hideSpinner();
          alert("Check you email for for new password");
          this.loginForm.reset();
          this.setMode(0);
        },
        err => {
          this.hideSpinner();
          this.showErrorMessage({ code: CODES.CODE_NOT_FOUND });
        }
        );


  }

  unSubscribeToLogin() {
    if (this.loginSubscription !== undefined) {
      this.loginSubscription.unsubscribe();
    }
  }

  //handle data response here
  onLoginData(r) {
    this.hideSpinner();//hide spinner
    this.rs.setItem('token', r.data.token);
    this.router.navigate(['admin']);//then navigate to dash board
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
    } else if (code === CODES.CODE_NOT_FOUND) {
      this.errorMessage.nativeElement.textContent = "No account associated with this email has been found";
    }
  }

}


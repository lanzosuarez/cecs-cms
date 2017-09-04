import { StyleHelperService } from './../services/style-helper.service';
import { User } from './../../models/user';
import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';

import {
    FormBuilder,
    Validators,
    FormGroup
} from '@angular/forms';


@Component({
    selector: 'cecs-account',
    templateUrl: 'account.component.html',
    styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {

    @ViewChild('backdrop') backdrop: ElementRef;
    @ViewChild('dialog') dialog: ElementRef;
    @ViewChild('editLock') editLock: ElementRef;
    @ViewChild('formAdmin') formAdmin: ElementRef;

    user: User = {
        name: "",
        email: "",
        username: ""
    }

    adminForm: FormGroup;

    constructor(
        private style: StyleHelperService,
        private formBuilder: FormBuilder
    ) {
        this.initializeAdminForm();
        this.disableControls(true);
        this.setUser();
        this.initializeAdminForm();
    }

    ngOnInit() { }

    setUser() {
        this.user = {
            name: "Julius Abad Santos",
            email: "positivebadz@gmail.com",
            username: "positiveBadz"
        };
    }

    initializeAdminForm() {
        //initialize login DATA DRIVEN FORM
        this.setForm(this.user);

    }

    setForm(user: User) {
        const { name, email, username } = user;

        this.adminForm = this.formBuilder.group({
            name: this.stringRequired(name),
            username: this.stringRequired(username),
            email: this.stringRequired(email)
        });
    }

    stringRequired(val) {
        return [val, Validators.required];
    }

    openEdit() {
        this.style.hideElementFlex(this.backdrop, false);
    }

    hideEdit() {
        this.style.hideElementFlex(this.backdrop, true);
        this.initEditLock();
    }

    clickDialog(e: Event) {
        e.stopPropagation();
    }

    disableControls(flag) {
        const controls = this.adminForm.controls;
        Object.keys(controls).forEach(control => {
            flag === true ?
                controls[control].disable() :
                controls[control].enable()
        });
    }


    clickEditLock() {
        const editLock = <HTMLElement>this.editLock.nativeElement;
        if (editLock.classList.contains('fa-lock')) {
            this.style.removeClass(editLock, 'fa-lock');
            this.style.addClass(editLock, 'fa-unlock');
            this.disableControls(false);
        } else {
            this.style.addClass(editLock, 'fa-lock');
            this.style.removeClass(editLock, 'fa-unlock');
            this.disableControls(true);
        }
    }

    initEditLock() {
        const editLock = <HTMLElement>this.editLock.nativeElement;
        this.style.removeClass(editLock, 'fa-unlock');
        this.style.addClass(editLock, 'fa-lock');
        this.disableControls(true);
    }

    










}
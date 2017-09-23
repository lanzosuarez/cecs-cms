import { LoadingService } from './../loader/loading.service';
import { DataService } from './../services/data.service';
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
    @ViewChild('backdropAdd') backdropAdd: ElementRef;
    @ViewChild('dialogaAdd') dialogaAdd: ElementRef;
    @ViewChild('editLock') editLock: ElementRef;
    @ViewChild('formAdmin') formAdmin: ElementRef;
    @ViewChild('addForm') addForm: ElementRef;

    user: User = {
        name: "",
        email: "",
        username: ""
    }

    adminForm: FormGroup;
    addUserForm: FormGroup;

    constructor(
        private style: StyleHelperService,
        private formBuilder: FormBuilder,
        private data: DataService,
        private loading: LoadingService
    ) {
        this.initializeAdminForm();
        this.initAddUserForm();
        this.setUser();
        this.initializeAdminForm();
        this.disableControls(true);
        this.getAdmin();
    }

    ngOnInit() { }

    setUser() {
        this.user = {
            name: "",
            email: "",
            username: ""
        };
    }

    initializeAdminForm() {
        //initialize login DATA DRIVEN FORM
        this.setForm(this.user);

    }

    getAdmin() {
        this.loading.addCounter();
        this.data.getAdmin()
            .subscribe(
            r => {
                this.loading.minusCounter();
                this.setForm(r.data);
                this.disableControls(true);
                this.user = r.data;
            },
            err => {
                this.loading.minusCounter();
                alert("Something went wrong");
            }
            );
    }

    addUser() {
        this.loading.addCounter();
        const cred = this.addUserForm.value;
        this.data.createAdmin(cred)
            .subscribe(
            r => {
                this.loading.minusCounter();;
                this.addUserForm.reset();
                this.hideAdd();
                alert("User added. The password was sent to the email entered");
            },
            err => {
                this.loading.minusCounter()
                alert("Error while creating user");
            }
            );
    }

    editAdmin() {
        this.loading.addCounter();
        const cred = this.adminForm.value;
        this.data.editAdmin(cred)
            .subscribe(
            r => {
                this.loading.minusCounter();
                alert("Success");
                this.setForm(cred);
                this.clickEditLock();
                this.disableControls(true);
            },
            err => {
                alert("Error while updating admin info");
                this.loading.minusCounter();
            }
            )
    }

    setForm(user) {
        const { firstname, lastname, email, username } = user;

        this.adminForm = this.formBuilder.group({
            firstname: this.stringRequired(firstname),
            lastname: this.stringRequired(lastname),
            username: this.stringRequired(username),
            email: this.stringRequired(email)
        });
    }

    initAddUserForm() {
        this.addUserForm = this.formBuilder.group({
            username: this.stringRequired(''),
            firstname: this.stringRequired(''),
            lastname: this.stringRequired(''),
            email: this.stringRequired(''),
        });
    }


    openAdd() {
        this.style.hideElementFlex(this.backdropAdd, false);
    }
    hideAdd() {
        this.style.hideElementFlex(this.backdropAdd, true);
        this.initAddUserForm();
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
        this.setForm(this.user);
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
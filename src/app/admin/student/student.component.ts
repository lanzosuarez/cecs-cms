import { StyleHelperService } from './../services/style-helper.service';
import { Schedule } from './../../models/schedule';
import { Student } from './../../models/student';
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
    selector: 'cecs-student',
    templateUrl: 'student.component.html',
    styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {

    @ViewChild('backdrop') backdrop: ElementRef;
    @ViewChild('dialog') dialog: ElementRef;
    @ViewChild('editLock') editLock: ElementRef;
    @ViewChild('formStudent') formStudent: ElementRef;
    @ViewChild('inputSearches') inputSearches: ElementRef;

    studentForm: FormGroup;


    students: Student[] = [
        new Student(
            "dsadsadsadasd32",
            "ABC",
            "1",
            "4",
            "Juan",
            "Tama",
            "Tamad",
            "F",
            "juan.tamad@gmail.com",
            [
                new Schedule(this.getDay(0), "8:30", "12:30")
            ]
        ),
        new Student(
            "dsadsadsadasd32",
            "ABC",
            "1",
            "4",
            "Juan",
            "Tama",
            "Tamad",
            "F",
            "juan.tamad@gmail.com",
            [
                new Schedule(this.getDay(0), "8:30", "12:30")
            ]
        ),

        new Student(
            "dsadsadsadasd32",
            "CDS",
            "4",
            "5",
            "Jose",
            "Protacio",
            "Rizal",
            "M",
            "jose.rizal@gmail.com",
            [
                new Schedule(this.getDay(0), "8:30", "12:30")
            ]
        ),
        new Student(
            "dsadsadsadasd32",
            "CDS",
            "4",
            "5",
            "Jose",
            "Protacio",
            "Rizal",
            "M",
            "jose.rizal@gmail.com",
            [
                new Schedule(this.getDay(0), "8:30", "12:30")
            ]
        ),
        new Student(
            "dsadsadsadasd32",
            "CDS",
            "4",
            "5",
            "Jose",
            "Protacio",
            "Rizal",
            "M",
            "jose.rizal@gmail.com",
            [
                new Schedule(this.getDay(0), "8:30", "12:30")
            ]
        ),   
        new Student(
            "dsadsadsadasd32",
            "CDS",
            "4",
            "5",
            "Jose",
            "Protacio",
            "Rizal",
            "M",
            "jose.rizal@gmail.com",
            [
                new Schedule(this.getDay(0), "8:30", "12:30")
            ]
        ),
        new Student(
            "dsadsadsadasd32",
            "CDS",
            "4",
            "5",
            "Jose",
            "Protacio",
            "Rizal",
            "M",
            "jose.rizal@gmail.com",
            [
                new Schedule(this.getDay(0), "8:30", "12:30")
            ]
        ),
        new Student(
            "dsadsadsadasd32",
            "CDS",
            "4",
            "5",
            "Jose",
            "Protacio",
            "Rizal",
            "M",
            "jose.rizal@gmail.com",
            [
                new Schedule(this.getDay(0), "8:30", "12:30")
            ]
        ),
        new Student(
            "dsadsadsadasd32",
            "CDS",
            "4",
            "5",
            "Jose",
            "Protacio",
            "Rizal",
            "M",
            "jose.rizal@gmail.com",
            [
                new Schedule(this.getDay(0), "8:30", "12:30")
            ]
        )
    ];

    constructor(
        private style: StyleHelperService,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit() {
        this.initializeForm();
        this.disableControls(true);
    }

    initializeForm() {
        this.studentForm = this.formBuilder.group({
            sr_code: this.stringRequired(''),
            year: this.stringRequired(''),
            section: this.stringRequired(''),
            firstname: this.stringRequired(''),
            middlename: this.stringRequired(''),
            lastname: this.stringRequired(''),
            gender: this.stringRequired(''),
            email: this.stringRequired('')
        });

    }

    getStudentScheds(_id) {
        console.log(_id)
        //get scheds
    }

    deleteStudent(_id: string, i: number) {
        console.log(_id)
        const decision = confirm("Are you sure you want to remove this item?");

        if (decision) {
            this.students.splice(i, 1);
        } else {
            return false;
        }
    }



    stringRequired(val) {
        return [val, Validators.required];
    }

    openEdit(student: Student) {

        const s = Object.assign({}, student);
        delete s.schedules;
        delete s._id;

        this.studentForm.setValue(s);
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
        const controls = this.studentForm.controls;
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


    getDay(index) {
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        return days[index];
    }

    hideSearchForm() {
        console.log("ghello");
        if (this.inputSearches.nativeElement.style.display === 'none') {
            this.style.hideElementFlex(this.inputSearches, false);
        } else {
            this.inputSearches.nativeElement.style.display = 'none'
        }
    }


}
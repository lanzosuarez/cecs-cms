import { InstructorSchedule } from './../../models/instructor_schedule';
import { Instructor } from './../../models/instructor';
import { colleges, courses } from './../school-data';
import { LoadingService } from './../loader/loading.service';
import { DataService } from './../services/data.service';
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
    selector: 'cecs-instructor',
    templateUrl: 'instructor.component.html',
    styleUrls: ['./instructor.component.css']
})

export class InstructorComponent implements OnInit {

    @ViewChild('backdrop') backdrop: ElementRef;
    @ViewChild('dialog') dialog: ElementRef;
    @ViewChild('editLock') editLock: ElementRef;
    @ViewChild('formStudent') formStudent: ElementRef;
    @ViewChild('inputSearches') inputSearches: ElementRef;

    studentForm: FormGroup;
    addScheduleForm: FormGroup;
    selectedStudent: Instructor;
    selectedSchedule: InstructorSchedule;

    addStudentFlag: boolean = false;

    instructors: Instructor[] = [];

    collegesData = colleges;
    coursesData = courses;
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    constructor(
        private style: StyleHelperService,
        private formBuilder: FormBuilder,
        private dataService: DataService,
        private loading: LoadingService
    ) {

        console.log(this.collegesData, this.coursesData);
    }

    ngOnInit() {
        this.initializeForm();
        this.initAddScheduleForm();
        this.disableControls(true);
        this.getStudents();
    }

    initializeForm() {
        this.studentForm = this.formBuilder.group({
            emp_id: this.stringRequired(''),
            firstname: this.stringRequired(''),
            middlename: this.stringRequired(''),
            lastname: this.stringRequired(''),
            gender: this.stringRequired(''),
            email: this.stringRequired('')
        });

    }

    initAddScheduleForm() {
        this.addScheduleForm = this.formBuilder.group({
            subject: this.stringRequired(''),
            year: this.stringRequired(''),
            section: this.stringRequired(''),
            building: this.stringRequired(''),
            day: this.stringRequired(''),
            start: this.stringRequired(''),
            end: this.stringRequired(''),
        });
    }

    ///student requests 

    getStudents() {
        this.loading.addCounter();
        this.dataService.getInstructors()
            .subscribe(
            r => {
                this.loading.minusCounter();
                console.log(r);
                this.instructors = r.data;
            },
            err => {
                this.loading.minusCounter();
                console.error(err);
            }
            );
    }


    addStudent() {
        this.loading.addCounter();

        const student = this.studentForm.value;

        this.dataService.createInstructor(student)
            .subscribe(
            r => {
                this.loading.minusCounter();
                this.hideEdit();
                this.initializeForm();
                this.getStudents();
            },
            err => {
                this.loading.minusCounter();
                console.error(err);
                alert("There's an error while fethcing the instructors information. Please try again");
            }
            );
    }

    fireDeleteStudent(_id, i) {
        this.loading.addCounter();
        this.dataService.deleteInstructor(_id)
            .subscribe(
            r => {
                this.loading.minusCounter();
                this.instructors.splice(i, 1);
            },
            err => {
                this.loading.minusCounter();
                console.error(err);
                alert("There's an error while deleting the instructor. Please try again");
            }
            );
    }


    editStudent() {
        var flag = confirm("Are you sure you want to save these changes?");
        if (flag) {
            console.log(this.studentForm.value);
            this.loading.addCounter();
            this.dataService
                .updateInstructor(this.studentForm.value, this.selectedStudent._id)
                .subscribe(
                r => {
                    alert("Information successfully updated");
                    this.loading.minusCounter();
                    this.clickEditLock();

                }, err => {
                    this.loading.minusCounter();
                    console.error(err);
                    alert("There's an error while updating the student. Please try again");
                }
                );
        } else {
            return false;
        }
    }


    deleteStudent(_id: string, i: number) {
        const decision = confirm("Are you sure you want to remove this item?");
        if (decision) {
            this.fireDeleteStudent(_id, i)
        } else {
            return false;
        }
    }

    ///////////////////////


    //schedule requests

    addStudentSchedule() {
        console.log(this.selectedStudent, this.addScheduleForm.value);
        const
            { _id } = this.selectedStudent,
            schedule = this.addScheduleForm.value;

        this.loading.addCounter();
        this.dataService.addInstructorSchedule(_id, schedule)
            .subscribe(
            r => {
                alert("Schedule successfully added");
                this.loading.minusCounter();
                this.addScheduleForm.reset();
                this.selectedStudent.schedules = r.data;
            },
            err => {
                this.loading.minusCounter();
                alert("An error happened while adding schedule. Please try again")
                console.error(err);
            }
            )
    }


    fireDeleteStudentSchedule(schedule_id, i) {
        const { _id } = this.selectedStudent;

        this.loading.addCounter();
        this.dataService.deleteInstructorSchedule(_id, schedule_id)
            .subscribe(
            r => {
                this.loading.minusCounter();
                this.selectedStudent.schedules.splice(i, 1);
            },
            err => {
                this.loading.minusCounter();
                alert("An error happened while deleting the schedule. Please try again")
                console.error(err);
            }
            );
    }

    deleteStudentSchedule(e: MouseEvent, _id: string, i: number) {
        e.stopPropagation();
        const decision = confirm("Are you sure you want to remove this item?");
        if (decision) {
            this.fireDeleteStudentSchedule(_id, i);
        } else {
            return false;
        }
    }


    updateStudentSchedule() {
        const flag = confirm("Are you sure you want to save these changes?");
        if (flag) {
            const
                { _id } = this.selectedStudent,
                { _id: schedule_id } = this.selectedSchedule,
                schedule = this.addScheduleForm.value;

            console.log(schedule);

            this.loading.addCounter()
            this.dataService.updateInstructorSchedule(
                _id,
                schedule_id,
                schedule
            ).subscribe(
                r => {
                    alert("Schedule successfully updated!");
                    this.loading.minusCounter();
                    this.selectedSchedule = Object.assign(this.selectedSchedule, schedule);
                    this.selectedSchedule = undefined;
                    this.initAddScheduleForm();
                },
                err => {
                    this.loading.minusCounter();
                    alert("An error happened while updating the schedule. Please try again")
                    console.error(err);
                }
                );
        } else {
            return false;
        }

    }

    /////


    stringRequired(val) {
        return [val, Validators.required];
    }

    openAddStudent() {
        this.addStudentFlag = true;
        this.style.hideElementFlex(this.backdrop, false);

    }

    openEdit(student, i: number) {
        console.log(student);
        this.selectedStudent = this.instructors[i];
        this.setStudentFormValue(student);
        this.style.hideElementFlex(this.backdrop, false);
    }

    setStudentFormValue(student) {
        const s = Object.assign({}, student);
        delete s.schedules;
        delete s._id;
        delete s.__v;
        this.studentForm.setValue(s)
    }

    setScheduleFormValue(schedule) {
        const s = Object.assign({}, schedule);
        delete s._id;
        this.addScheduleForm.setValue(s)
    }

    selectSchedule(i: number) {
        this.selectedSchedule = this.selectedStudent.schedules[i];
        this.setScheduleFormValue(this.selectedSchedule);
    }

    deselectSchedule() {
        this.selectedSchedule = undefined;
        this.initAddScheduleForm();
    }


    hideEdit() {
        this.style.hideElementFlex(this.backdrop, true);
        this.initEditLock();
        this.initializeForm();
        this.initAddScheduleForm();
        this.disableControls(true);

        this.selectedStudent = undefined;
        this.selectedSchedule = undefined;
        this.addStudentFlag = false;
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
        if (this.inputSearches.nativeElement.style.display === 'none') {
            this.style.hideElementFlex(this.inputSearches, false);
        } else {
            this.inputSearches.nativeElement.style.display = 'none'
        }
    }


}
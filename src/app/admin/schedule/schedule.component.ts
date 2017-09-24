import { Schedule } from './../../models/schedule';
import { LoadingService } from './../loader/loading.service';
import { DataService } from './../services/data.service';
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
    selector: 'cecs-schedule',
    templateUrl: 'schedule.component.html',
    styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit {

    @ViewChild('yearElement') yearElement: ElementRef;
    @ViewChild('sectionElement') sectionElement: ElementRef;
    @ViewChild('collegeElement') collegeElement: ElementRef;
    @ViewChild('courseElement') courseElement: ElementRef;

    addScheduleForm: FormGroup;
    selectedClassSchedule: Schedule[];

    mode: number = 1;

    sections = [];
    years = [];
    colleges = [];
    courses = [];
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    instructors = [];


    constructor(
        private dataService: DataService,
        private loading: LoadingService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.getClassesAndSections();
        this.initAddScheduleForm();
        this.getInstructors();
    }


    initAddScheduleForm() {
        this.addScheduleForm = this.formBuilder.group({
            subject: this.stringRequired(''),
            instructor: this.stringRequired(''),
            building: this.stringRequired(''),
            day: this.stringRequired(''),
            start: this.stringRequired(''),
            end: this.stringRequired(''),
        });
    }


    getClassesAndSections() {
        this.loading.addCounter();
        this.dataService.getDisticntClassAndSections()
            .subscribe(
            r => {
                this.loading.minusCounter();
                const { years, sections, courses, colleges } = r.data;
                this.years = years;
                this.sections = sections;
                this.colleges = colleges;
                this.courses = courses;
                //get selected initial class schedule
            },
            err => {
                this.loading.minusCounter();
                console.error(err);
            }
            );
    }

    getInstructors() {
        this.loading.addCounter();
        this.dataService.getInstructors()
            .subscribe(
            r => {
                console.log(r.data);
                this.loading.minusCounter();
                this.instructors = r.data;
            },
            err => {
                this.loading.minusCounter();
                alert("Error while fetching instructors");
            }
            )
    }


    fireBulkAddSchedule() {
        this.bulkAddSchedule(
            this.getYearAndSection(),
            this.getSchedules()
        );
    }


    fireBulkGetSchedule() {
        this.bulkGetSchedule(
            this.getYearAndSection()
        );
    }

    fireBulkDelSchedule(subject) {
        this.bulkDelSchedule(
            this.getYearAndSection(),
            { subject }
        );
    }


    bulkGetSchedule({ year, section, college, course }) {
        this.loading.addCounter();
        this.dataService.bulkGetStudentSchedule(year, section, college, course)
            .subscribe(
            r => {
                console.log(r);
                this.loading.minusCounter();
                this.selectedClassSchedule = r.data;
            },
            err => {
                console.error(err);
                this.loading.minusCounter();
            }
            )

    }

    bulkAddSchedule({ year, section, college, course }, schedules) {
        this.loading.addCounter();
        this.dataService.bulkAddStudentSchedule(year, section, college, course, schedules)
            .subscribe(
            r => {
                console.log(r);
                this.loading.minusCounter();
                this.resetForm();
            },
            err => {
                console.error(err);
                this.loading.minusCounter();
            }
            )

    }

    bulkDelSchedule({ year, section, college, course }, subject) {
        this.loading.addCounter();
        this.dataService.bulkDelStudentSchedule(year, section, college, course, subject)
            .subscribe(
            r => {
                console.log(r);
                this.loading.minusCounter();
                this.fireBulkGetSchedule();
            },
            err => {
                console.error(err);
                this.loading.minusCounter();
            }
            )

    }

    getSchedules() {
        return {
            schedules: [
                this.addScheduleForm.value
            ]
        };
    }

    getYearAndSection() {
        return {
            year: this.yearElement.nativeElement.value,
            section: this.sectionElement.nativeElement.value,
            college: this.collegeElement.nativeElement.value,
            course: this.courseElement.nativeElement.value
        };
    }

    searchSchedules() {
        this.selectedClassSchedule = null;
        this.fireBulkGetSchedule();
    }

    deleteClassSchedules(subject) {
        const decision = confirm("Are you sure you want to remove this Schedule?");
        if (decision) {
            this.fireBulkDelSchedule(subject);
        } else {
            return false;
        }
    }

    setMode(mode: number) {
        this.mode = mode;
        if (mode === 2) {
            this.fireBulkGetSchedule();
        }
    }

    resetForm() {
        this.addScheduleForm.reset();
    }

    stringRequired(val) {
        return [val, Validators.required];
    }
}
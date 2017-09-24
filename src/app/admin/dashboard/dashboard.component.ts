import { LoadingService } from './../loader/loading.service';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cecs-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

    studentsCount: number = 0;
    instructorsCount: number = 0;

    constructor(
        private data: DataService,
        private loading: LoadingService
    ) { }

    ngOnInit() {

        this.getStudents();
        this.getInstructors();
    }

    getStudents() {
        this.loading.addCounter();
        this.data.getStudents()
            .subscribe(
            r => {
                this.loading.minusCounter();
                this.studentsCount = r.data.length;
            },
            err => {
                this.loading.minusCounter();
            }
            );
    }

    getInstructors() {
        this.loading.addCounter();
        this.data.getInstructors()
            .subscribe(
            r => {
                this.loading.minusCounter();
                this.instructorsCount = r.data.length;
            },
            err => {
                this.loading.minusCounter();
            }
            );
    }




}
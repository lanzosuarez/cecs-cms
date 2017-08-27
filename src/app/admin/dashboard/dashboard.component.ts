import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cecs-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

    studentsCount: number = 110;
    instructorsCount: number = 110;
    buildingsCount: number = 110;

    constructor() { }

    ngOnInit() {


    }




}
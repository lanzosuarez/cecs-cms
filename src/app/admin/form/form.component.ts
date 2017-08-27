import { ResourceService } from './../../resource.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cecs-form',
    templateUrl: 'form.component.html',
    styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

    userType: number;

    constructor(
    ) {

    }

    ngOnInit() { }


}
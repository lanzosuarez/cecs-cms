import { ResourceService } from './../../resource.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'cecs-form',
    templateUrl: 'form.component.html',
    styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

    @Input('formPlaceHolder') formPlaceHolder: string = "";
    @Input('formTitle') formTitle: string = "";

    userType: number;

    constructor(
    ) {

    }

    ngOnInit() { }


}
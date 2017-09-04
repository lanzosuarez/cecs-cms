import { ResourceService } from './services/resource.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cecs-admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
    
    constructor(
        private rs: ResourceService,
    ) { }

    ngOnInit() { }

    logout(){
        this.rs.removeItem('token');
        window.location.pathname = '/';
    }
}
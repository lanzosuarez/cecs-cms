import { FormComponent } from './form/form.component';
import { StudentComponent } from './student/student.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResourceService } from './../resource.service';
import { AdminRouting } from './admin.routing';
import { AdminComponent } from './admin.component';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpModule,
        AdminRouting
    ],
    exports: [],
    declarations: [
        AdminComponent,
        DashboardComponent,
        StudentComponent,
        FormComponent
    ],
    providers: [
        ResourceService
    ],
})
export class AdminModule { }

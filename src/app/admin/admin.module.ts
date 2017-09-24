import { InstructorComponent } from './instructor/instructor.component';
import { AboutComponent } from './about/about.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DataService } from './services/data.service';
import { LoadingService } from './loader/loading.service';
import { LoaderComponent } from './loader/loader.component';
import { AdminGuardService } from './services/admin.guard.service';
import { ResourceService } from './services/resource.service';
import { AccountComponent } from './account/account.component';
import { FormComponent } from './form/form.component';
import { StudentComponent } from './student/student.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRouting } from './admin.routing';
import { AdminComponent } from './admin.component';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//3rd party
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpModule,
        AdminRouting,
        Ng2FilterPipeModule,
        FormsModule
    ],
    exports: [],
    declarations: [
        AdminComponent,
        DashboardComponent,
        StudentComponent,
        FormComponent,
        AccountComponent,
        LoaderComponent,
        ScheduleComponent,
        AboutComponent,
        InstructorComponent,
    ],
    providers: [
        ResourceService,
        AdminGuardService,
        LoadingService,
        DataService
    ],
})
export class AdminModule { }

import { AboutComponent } from './about/about.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { StudentComponent } from './student/student.component';
import { AdminGuardService } from './services/admin.guard.service';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';

const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AdminGuardService],
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'account',
                component: AccountComponent
            },
            {
                path: 'students',
                component: StudentComponent
            },
            {
                path: 'schedule',
                component: ScheduleComponent
            },
            {
                path: 'about',
                component: AboutComponent
            }
        ]
    },

];



export const AdminRouting = RouterModule.forChild(ADMIN_ROUTES);
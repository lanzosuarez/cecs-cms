import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';

const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'account',
                component: AccountComponent
            }
        ]
    },

];



export const AdminRouting = RouterModule.forChild(ADMIN_ROUTES);
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';

const APP_ROUTES: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
    }
];



export const Routing = RouterModule.forRoot(APP_ROUTES);
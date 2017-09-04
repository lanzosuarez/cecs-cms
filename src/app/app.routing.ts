import { LoginGuardService } from './admin/services/login.guard.service';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';

const APP_ROUTES: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [LoginGuardService]
    },
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
    }
];



export const Routing = RouterModule.forRoot(APP_ROUTES);
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';

const APP_ROUTES: Routes = [
    {
        path: '',
        component: LoginComponent
    },
     {
        path: 'profile',
        component: ProfileComponent
    }
];



export const Routing = RouterModule.forRoot(APP_ROUTES);
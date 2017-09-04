import { LoginService } from './login.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class LoginGuardService implements CanActivate {

    constructor(
        private router: Router,
        private loginService: LoginService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        return this.loginService.decodeUser()
            .toPromise()
            .then(r => {
                this.router.navigate(['admin']);
                return false;
            }).catch(err => {
                return true;
            });
    }
}
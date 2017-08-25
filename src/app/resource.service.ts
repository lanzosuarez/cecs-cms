import { Admin } from './models/admin';
import { url } from './global';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ResourceService {

    onData(data: Response) {
        return data.json();
    }

    onError(err: Response) {
        return Observable.throw(err.json());
    }

    getUser() {
        return JSON.parse(window.localStorage.getItem('user'));
    }

    setToken(token: string): void {
        window.localStorage.setItem('token', token);
    }

    setUser(user) {
        window.localStorage.setItem('user', this.stringify(user));
    }

    stringify(obj) {
        return JSON.stringify(obj);
    }

    getToken(): string {
        return window.localStorage.getItem('token');
    }

    getPostHeader() {
        return new Headers({
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
    }
    

}

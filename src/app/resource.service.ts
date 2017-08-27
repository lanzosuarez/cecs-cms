import { Admin } from './models/admin';
import { url } from './global';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ResourceService {

    userType: number;

    onData(data: Response) {
        return data.json();
    }

    onError(err: Response) {
        return Observable.throw(err.json());
    }

    getItem(item) {
        return JSON.parse(window.localStorage.getItem(item));
    }

    setItem(name, value) {
        window.localStorage.setItem(name, this.stringify(value));
    }

    setUserType(type: number){
        this.userType = type;
    }

    getUserType(){
        return this.userType;
    }


    stringify(obj) {
        return JSON.stringify(obj);
    }

    getPostHeader() {
        return new Headers({
            'Content-Type': 'application/json',
            'x-access-token': this.getItem('token')
        });
    }


}

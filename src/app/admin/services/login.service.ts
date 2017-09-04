import { ResourceService } from './resource.service';
import { url } from './../../global';
import { Admin } from './../../models/admin';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class LoginService {
    private url: string = url;

    constructor(
        private http: Http,
        private rs: ResourceService
    ) { }

    onLogin(cred: Admin): Observable<any> {

        const
            body = this.rs.stringify(cred),
            headers = new Headers({
                'Content-Type': 'application/json'
            });

        return this.http.post(`${url}/cecs/login`, body, { headers }).
            map(this.rs.onData).catch(this.rs.onError);
    }

    decodeUser(): Observable<any> {

        const headers = new Headers({
            'x-access-token': this.rs.getItem('token')
        });

        return this.http.get(`${url}/cecs/decode_user`, { headers }).
            map(this.rs.onData).catch(this.rs.onError);
    }


}

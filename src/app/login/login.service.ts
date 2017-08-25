import { ResourceService } from './../resource.service';
import { Injectable } from '@angular/core';
import { Admin } from './../models/admin';
import { url } from './../global';
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
            headers = this.rs.getPostHeader();

        return this.http.post(`${url}/jrc/login`, body, { headers }).
            map(this.rs.onData).catch(this.rs.onError);
    }

}

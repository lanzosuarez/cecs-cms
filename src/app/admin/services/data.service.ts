import { Schedule } from './../../models/schedule';
import { url } from './../../global';
import { ResourceService } from './resource.service';
import { Http, Headers } from '@angular/http';
import { Student } from './../../models/student';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {


    constructor(
        private http: Http,
        private rs: ResourceService
    ) { }



    getStudents() {
        const headers = new Headers({
            'x-access-token': this.rs.getItem('token')
        });

        return this.http.get(`${url}/cecs/student`, { headers })
            .map(r => r.json())
            .catch(err => err.json());
    }


    createStudent(student: Student) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': this.rs.getItem('token')
        });

        return this.http.post(`${url}/cecs/student`, student, { headers })
            .map(r => r.json())
            .catch(err => err.json());
    }

    deleteStudent(_id) {
        const headers = new Headers({
            'x-access-token': this.rs.getItem('token')
        });

        return this.http.delete(`${url}/cecs/student/${_id}`, { headers })
            .map(r => r.json())
            .catch(err => err.json());
    }


    updateStudent(student: Student, _id) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': this.rs.getItem('token')
        });

        return this.http.patch(`${url}/cecs/student/${_id}`, student, { headers })
            .map(r => r.json())
            .catch(err => err.json());
    }


    addStudentSchedule(student_id, schedule: Schedule) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': this.rs.getItem('token')
        });

        return this.http.post(`${url}/cecs/student_schedule/${student_id}`, schedule, { headers })
            .map(r => r.json())
            .catch(err => err.json());
    }

    deleteStudentSchedule(student_id, schedule_id) {
        const headers = new Headers({
            'x-access-token': this.rs.getItem('token')
        });

        return this.http.delete(`${url}/cecs/student_schedule/${student_id}/${schedule_id}`, { headers })
            .map(r => r.json())
            .catch(err => err.json());
    }


    updateStudentSchedule(student_id, schedule_id, schedule: Schedule) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': this.rs.getItem('token')
        });

        return this.http.patch(`${url}/cecs/student_schedule/${student_id}/${schedule_id}`, schedule, { headers })
            .map(r => r.json())
            .catch(err => err.json());
    }

}
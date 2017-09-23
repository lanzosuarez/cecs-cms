import { Instructor } from './../../models/instructor';
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


    getAdmin() {
        const headers = new Headers({
            'x-access-token': this.rs.getItem('token')
        });

        return this.http.get(`${url}/cecs/user`, { headers })
            .map(r => r.json())
            .catch(err => err.json());
    }


    editAdmin(data) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': this.rs.getItem('token')
        });

        return this.http.patch(`${url}/cecs/user`, data, { headers })
            .map(r => r.json())
            .catch(err => err.json());
    }

    createAdmin(data) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': this.rs.getItem('token')
        });

        return this.http.post(`${url}/cecs/user`, data, { headers })
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

    bulkGetStudentSchedule(year, section, college, course) {
        const headers = new Headers({
            'x-access-token': this.rs.getItem('token')
        });

        return this.http.get(`${url}/cecs/student_schedule/bulk/${year}/${section}/${college}/${course}`, { headers })
            .map(r => r.json())
            .catch(err => err.json());
    }

    bulkAddStudentSchedule(year, section, college, course, schedules) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': this.rs.getItem('token')
        });

        return this.http.post(`${url}/cecs/student_schedule/bulk/${year}/${section}/${college}/${course}`, schedules, { headers })
            .map(r => r.json())
            .catch(err => err.json());
    }

    bulkDelStudentSchedule(year, section, college, course, subject) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': this.rs.getItem('token')
        });

        return this.http.patch(`${url}/cecs/student_schedule/bulk/${year}/${section}/${college}/${course}`, subject, { headers })
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


    getDisticntClassAndSections() {
        const headers = new Headers({
            'x-access-token': this.rs.getItem('token')
        });

        return this.http.get(`${url}/cecs/classes`, { headers })
            .map(r => r.json())
            .catch(err => err.json());
    }

    //INSTRUCTORS


    getInstructors() {
        const headers = new Headers({
            'x-access-token': this.rs.getItem('token')
        });

        return this.http.get(`${url}/cecs/instructor`, { headers })
            .map(r => r.json())
            .catch(err => err.json());
    }

    createInstructor(instructor: Instructor) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': this.rs.getItem('token')
        });

        return this.http.post(`${url}/cecs/instructor`, instructor, { headers })
            .map(r => r.json())
            .catch(err => err.json());
    }

    deleteInstructor(_id) {
        const headers = new Headers({
            'x-access-token': this.rs.getItem('token')
        });

        return this.http.delete(`${url}/cecs/instructor/${_id}`, { headers })
            .map(r => r.json())
            .catch(err => err.json());
    }


    updateInstructor(student: Student, _id) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': this.rs.getItem('token')
        });

        return this.http.patch(`${url}/cecs/instructor/${_id}`, student, { headers })
            .map(r => r.json())
            .catch(err => err.json());
    }


    addInstructorSchedule(instructor_id, schedule: Schedule) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': this.rs.getItem('token')
        });

        return this.http.post(`${url}/cecs/instructor_schedule/${instructor_id}`, schedule, { headers })
            .map(r => r.json())
            .catch(err => err.json());
    }

    deleteInstructorSchedule(instructor_id, schedule_id) {
        const headers = new Headers({
            'x-access-token': this.rs.getItem('token')
        });

        return this.http.delete(`${url}/cecs/instructor_schedule/${instructor_id}/${schedule_id}`, { headers })
            .map(r => r.json())
            .catch(err => err.json());
    }


    updateInstructorSchedule(instructor_id, schedule_id, schedule: Schedule) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-access-token': this.rs.getItem('token')
        });

        return this.http.patch(`${url}/cecs/instructor_schedule/${instructor_id}/${schedule_id}`, schedule, { headers })
            .map(r => r.json())
            .catch(err => err.json());
    }



}
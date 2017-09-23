import { InstructorSchedule } from './instructor_schedule';
export class Instructor {
    constructor(
        public _id: string,
        public emp_id: string,
        public firstname: string,
        public middlename: string,
        public lastname: string,
        public gender: string,
        public email: string,
        public schedules: InstructorSchedule[],
    ) { }
}
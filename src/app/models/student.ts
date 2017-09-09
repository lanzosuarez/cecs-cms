import { Schedule } from './schedule';
export class Student {
    constructor(
        public _id: string,
        public sr_code: string,
        public section: string,
        public year: string,
        public college: string,
        public course: string,
        public firstname: string,
        public middlename: string,
        public lastname: string,
        public gender: string,
        public email: string,
        public schedules: Schedule[],
    ) { }
}
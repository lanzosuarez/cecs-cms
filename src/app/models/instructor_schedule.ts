export class InstructorSchedule {
    constructor(
        public subject: string,
        public building: string,
        public day: string,
        public start: string,
        public end: string,
        public year: string,
        public section: string,
        public _id?: string,
    ) { }
}
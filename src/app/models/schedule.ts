export class Schedule {
    constructor(
        public subject: string,
        public instructor: string,
        public building: string,
        public day: string,
        public start: string,
        public end: string,
        public _id?: string,
    ) { }
}
export class User {
    constructor(
        public username: string,
        public name: string,
        public email: string,
        public firstname?: string,
        public lastname?: string,
    ) { }
}
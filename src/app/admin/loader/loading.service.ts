import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {


    show = new Subject();
    counter: number = 0;

    constructor() { }

    emitRequestsCount() {
        this.show.next(this.counter);
    }

    addCounter() {
        this.counter += 1;
        this.emitRequestsCount();
    }

    minusCounter() {
        this.counter -= 1;
        this.emitRequestsCount();
    }

}
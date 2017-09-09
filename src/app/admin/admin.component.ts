import { LoadingService } from './loader/loading.service';
import { ResourceService } from './services/resource.service';
import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit
} from '@angular/core';

@Component({
    selector: 'cecs-admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['./admin.component.css']
})

export class AdminComponent implements AfterViewInit {

    @ViewChild('loader') loader: ElementRef;

    constructor(
        private loading: LoadingService,
        private rs: ResourceService,
    ) {

        this.loading.show.
            subscribe((r: number) => {
                console.log(r);
                if (r === 0) {
                    this.loader.nativeElement.style.display = 'none';
                } else {
                    this.loader.nativeElement.style.display = 'block';
                }
            });

    }

    ngAfterViewInit() {
        this.loading.emitRequestsCount();
    }

    logout() {
        this.rs.removeItem('token');
        window.location.pathname = '/';
    }
}
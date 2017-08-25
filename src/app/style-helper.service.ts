import { Injectable } from '@angular/core';


@Injectable()
export class StyleHelperService {

    hideElement(element, flag, inline = false) {
        if (inline === false) {
            element.nativeElement.style.display = flag === true ? 'none' : 'block';
        } else {
            element.nativeElement.style.display = flag === true ? 'none' : 'inline-block';
        }
    }


}

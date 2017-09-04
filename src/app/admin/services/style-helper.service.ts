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

    hideElementFlex(element, flag, inline = false) {
        if (inline === false) {
            element.nativeElement.style.display = flag === true ? 'none' : 'flex';
        } else {
            element.nativeElement.style.display = flag === true ? 'none' : 'inline-flex';
        }
    }

    addClass(element: HTMLElement, clasName) {
        element.classList.add(clasName);
    }

    removeClass(element: HTMLElement, clasName) {
        element.classList.remove(clasName);
    }

    toggle(variable: boolean){
        return !variable;
    }


}

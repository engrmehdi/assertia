import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class LoaderService {
    private loaderSubject = new Subject<any>();
    
    onLoader(): Observable<any>{
        return this.loaderSubject.asObservable();
    }

    enableLoading(){
        this.loaderSubject.next(true);
    }

    clearLoading() {
        this.loaderSubject.next(false);
    }

}
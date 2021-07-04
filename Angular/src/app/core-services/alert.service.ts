import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Alert, AlertType } from '../com/assertia/sp/models/alert';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../com/assertia/sp/common/components/confirmation/confirmation.component';


@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<Alert>();
    private defaultId = 'default-alert';
    dialogRef: MatDialogRef<ConfirmationComponent> | null;
    constructor(public dialog: MatDialog) { }
    // enable subscribing to alerts observable
    onAlert(id = this.defaultId): Observable<Alert> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    // convenience methods
    success(message: string,useKey?:any, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Success, message,useKey }));
    }

    error(message: string,useKey?:any, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Error, message,useKey }));
    }

    info(message: string,useKey?:any, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Info, message,useKey }));
    }

    warn(message: string,useKey?:any, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Warning, message,useKey }));
    }

    // main alert method    
    alert(alert: Alert) {
        alert.id = alert.id || this.defaultId;
        this.subject.next(alert);
    }

    // clear alerts
    clear(id = this.defaultId) {
        this.subject.next(new Alert({ id }));
    }

    confirmation(key:any,yesFn: () => void, noFn?: () => void) {
        let object = {'key':key , "heading":"Please confirm !"}
        this.dialogRef = this.dialog.open(ConfirmationComponent, {
            width: '350px',
            disableClose: true,
            hasBackdrop: true,
            data:object
        });
        this.dialogRef.afterClosed().subscribe((result: any) => {
            if(result) {
                yesFn();
            } else {
                noFn();
            }
        });
    }
}
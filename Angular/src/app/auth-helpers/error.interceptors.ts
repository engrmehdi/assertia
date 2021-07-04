import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { AlertService } from '../core-services/alert.service';
import { ErrorTypes } from '../com/assertia/sp/utils/constants/error-types-constants';
import { LoaderService } from '../core-services/loader.service';
import { Router } from '@angular/router';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable()
export class ErrorInterceptors implements HttpInterceptor {
    constructor(private loginService: LoginService,
        private alertService: AlertService,
        private router: Router,
        private loaderService: LoaderService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            this.loaderService.clearLoading();
            if (err.status == ErrorTypes.UNAUTORIZED) {
                this.alertService.error(err.error.key?err.error.key:err.error.message,true);
            }
            else if (err.status == ErrorTypes.INTERNAL_SERVER_ERROR) {
                if (err.error.status || err.error.key) {
                    if (err.error.status == ErrorTypes.RECORD_NOT_FOUND) { 
                    }else if(err.error.status == ErrorTypes.TOKEN_EXPIRED){
                        this.alertService.error('Session Expired Please Login Again');
                        window.localStorage.removeItem(TOKEN_KEY);
                        window.localStorage.removeItem(USER_KEY);
                        this.router.navigate(['/login']);
                    }
                    else {
                        this.alertService.error(err.error.key?err.error.key:err.error.message,true);
                    }
                }
                else {
                    this.alertService.error('server down',true);
                }
            }
            else if (err.status == ErrorTypes.SERVICE_UNAVAILABLE) {
                this.alertService.error("Service not Found");
            }
            else if (err.status == ErrorTypes.NOT_FOUND) {
                this.alertService.error("API not Found");
            }
            else if (err.status == ErrorTypes.FORBIDDEN) {
                this.alertService.error("No permission to access this api");
            }
            else if (err.status == ErrorTypes.BAD_GATEWAY) {

            }
            else if (err.status == ErrorTypes.GATEWAY_TIMEOUT) {

            }
            else if (err.status == ErrorTypes.TOKEN_EXPIRED) {
                this.alertService.error("Session Expired");
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
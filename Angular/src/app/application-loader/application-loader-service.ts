import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, forkJoin } from 'rxjs';
import { Api } from '../com/assertia/sp/utils/api';

@Injectable({
  providedIn: 'root'
})
export class ApplicationLoaderService {
    constructor(private httpClient : HttpClient){}

    getLoggedInUser():Observable<any> {
        return this.httpClient.get(environment.baseUrl + Api.LOGED_IN_USER); 
    } 
}
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Api } from '../com/assertia/sp/utils/api';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private router : Router,private httpClient: HttpClient){}

  login(params){
    console.log("params",params)
    return this.httpClient.post(`${environment.baseUrl+Api.LOGIN}`, params); 
  }

  logout(){
    window.localStorage.clear();
    this.router.navigate(['/login']);
  } 
}
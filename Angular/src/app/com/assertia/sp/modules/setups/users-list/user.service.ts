import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 
import { Api } from '../../../utils/api';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private router : Router,private httpClient: HttpClient){}

  getAllUsers(){ 
    return this.httpClient.get<any>(`${environment.baseUrl+Api.FIND_ALL}`); 
  } 
  deleteUser(id){
    return this.httpClient.delete(`${environment.baseUrl+Api.DELETE_BY_ID}`+id); 
  }  
  addUser(params){
    return this.httpClient.post(`${environment.baseUrl+Api.SAVE}`, params); 
  }  
  updateUser(params){
    return this.httpClient.post(`${environment.baseUrl+Api.UPDATE}`, params); 
  } 
}
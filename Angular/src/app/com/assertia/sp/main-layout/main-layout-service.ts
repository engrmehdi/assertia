import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
@Injectable({
  providedIn: 'root'
})
export class MainLayoutService { 
  constructor(private httpClient: HttpClient) {
     
  }
  loggedInUser: any;
  setloggedInUser(loggedInUser) {
    this.loggedInUser = loggedInUser;
  } 
  getloggedInUser() {
    return this.loggedInUser;
  } 
}

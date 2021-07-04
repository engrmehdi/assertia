import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../core-services/loader.service';
import { TokenStorageService } from '../core-services/token.storage.service';
import { MainLayoutService } from '../com/assertia/sp/main-layout/main-layout-service';
import { ApplicationLoaderService } from './application-loader-service';
import { timer } from 'rxjs'; 

@Component({
  selector: 'app-application-loader',
  templateUrl: './application-loader.component.html',
  styleUrls: ['./application-loader.component.sass']
})
export class ApplicationLoaderComponent implements OnInit{
  info : any = 'Loading Languages...';
  progress : number = 0;
  user : any;
  constructor(private router: Router, 
              private applicationLoaderService : ApplicationLoaderService, 
              private tokenStorage: TokenStorageService, 
              private mainLayoutService : MainLayoutService) { 
    this.user = this.tokenStorage.getUser();
  }

  ngOnInit(){
    this.progress = 10
    timer(500).subscribe(val =>{
      this.getLoggedInUser();
    })  
  }

  getLoggedInUser(){
    this.info = 'Loading User Info...' 
    this.applicationLoaderService.getLoggedInUser().
      subscribe(data => {
        this.mainLayoutService.setloggedInUser(data); 
        this.progress = 20;
        this.getOrganisationLanguage(data.organisation)
      },error =>{})
  }
  getOrganisationLanguage(organisation){
    this.info = 'Loading Organisation Info...'
    this.progress = 30;
    this.getApplicationData();
  }

  getApplicationData(){
    this.info = 'Loading Application Params...'
    this.progress = 50;
    //  here we can add more things to laod on start of application
    this.progress = 100
    this.router.navigate(['/assertia']) 
  } 
  
}

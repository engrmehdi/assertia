import { Component, OnInit, HostListener, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../core-services/token.storage.service';
import { LoginService } from './login.service';
import { LoaderService } from '../core-services/loader.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatStepper, MatHorizontalStepper } from '@angular/material/stepper';
import { AlertService } from '../core-services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit,AfterViewInit {
  isLinear = false; 
  loginForm: FormGroup;
  sendEmailForm: FormGroup;
  password = false;
  username = false;
  @ViewChild('stepper') private myStepper: MatStepper;
  constructor(private formBuilder: FormBuilder,public dialog: MatDialog,
    private router : Router,
    private loginService : LoginService,
    private loadingService : LoaderService,
    private tokenStorage : TokenStorageService,
    private alertService: AlertService) { }

  get f() { return this.sendEmailForm.controls; }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.sendEmailForm = this.formBuilder.group({
      username: [''], 
    });
    this.loadingService.enableLoading();
  }
  ngAfterViewInit(){ 
    if(this.router.url === '/resend-email'){
      this.myStepper.next();
    }
  }
  @HostListener('focusin', ['$event']) onFocus(event) {
    if(event.target && event.target.id == 'username')this.username = false;
    if(event.target && event.target.id == 'password')this.password = false;
  }

  onSubmit(loginObject){
    if (this.loginForm.invalid) {
      this.username = true;
      this.password = true;
      return;
    }
    this.loginService.login(loginObject).
    subscribe(res => {
      console.log("res",res)
      let response:any = res; 
      if(response.token){
        this.tokenStorage.saveToken(response.token);
        this.getUser(response.token);
      }
    },error => {})
  }
 getUser(token){  
  this.router.navigate(['']);
 }
  sendDisable:boolean = false; 
}
 
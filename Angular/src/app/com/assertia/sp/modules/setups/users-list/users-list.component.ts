import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { BaseClass } from '../../../utils/baseclass';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { AlertService } from 'src/app/core-services/alert.service';
import { MainLayoutService } from '../../../main-layout/main-layout-service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass']
})
export class UsersListComponent implements OnInit {

  user : any;
  id : number; 
  users:any[]=[];
  p : number=1;
  searchText:any="";
  matDialogRef: MatDialogRef<AddUserComponent> | null;
  constructor(private router:Router,private userService: UserService,
  protected matDialog: MatDialog,private alertService:AlertService,
  private mainLayoutService:MainLayoutService) { 
   }

  ngOnInit() {
    this.getUsersList();
    
  } 
  getUsersList(){
    this.userService.getAllUsers().subscribe(
      response => {
        this.users = response; 
      }
     );
  } 
  
  deleteUser(user:any): void {
    if(user.id === this.mainLayoutService.getloggedInUser().id){
      this.alertService.warn("can not be deleted! this is currently login");
      return;
    }
    let that = this;
      this.alertService.confirmation("deleteOneConfirm",
        function () {
          that.deleteUserById(user);
     }); 
  } 
  deleteUserById(user:any): void { 
    this.userService.deleteUser(user.id)
      .subscribe( data => {
        this.getUsersList();
    }) 
  } 
  updateUser(user){ 
  } 
  
  openModal(data=null) { 
    this.matDialogRef = this.matDialog.open(AddUserComponent, {
      height: '430px',
      disableClose: true,
      hasBackdrop: true,
      data: data
    });
    this.matDialogRef.beforeClosed().subscribe((result: any) => {
    });
    this.matDialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.addEditUser(result);
      }
      this.matDialogRef = null;
    });
  }
  addEditUser(user){
    if(user.id){ 
      this.userService.updateUser(user)
      .subscribe( data => {
        this.getUsersList();
    }) 
    }else{ 
      this.userService.addUser(user)
      .subscribe( data => {
        this.getUsersList();
    }) 
    }
  }
}

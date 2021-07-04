import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})
export class AddUserComponent implements OnInit { 
  public breakpoint: number;
  public name: string = ``;
  public address: string = ``;
  public organisation: any;
  public addUserForm: FormGroup;
  public addPerspectiveForm: FormGroup;
  public modalData: any;
  public wasFormChanged = false;
  public contentHeight = ''; 
  public saveClicked:boolean = false; 
  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.modalData = data;
  }

  public ngOnInit(): void {
    this.addUserForm = this.fb.group({
      id:[null],
      userName: [null, [Validators.required]],
      email: [null],
      phone: [null],
      streat: [null],
      state: [null],
      country: [null], 
    }); 
    this.breakpoint = window.innerWidth <= 600 ? 1 : 1; // Breakpoint observer code 
 
  }
  hasChild = (_: number, node: any) => node.expandable;
  ngAfterViewInit() { 
    if(this.modalData){
      this.addUserForm.patchValue(this.modalData);
    }
    this.addUserForm.value['selectedCountry'] = this.modalData.country.id.toString();
    console.log("this.addUserForm.value",this.addUserForm.value)
  } 
  saveUser(): void {
    if (this.addUserForm.invalid) {
      return;
    } 
    this.modalData = this.addUserForm.value; 
    if(this.modalData.id == null){
      this.modalData.country = {id:1,name:'Pakistan'};
      this.modalData.state = {id:1,name:'Punjab'};
      this.modalData.streat = {id:1,name:'abc1'};
    }
    this.dialogRef.close(this.modalData);
  }

  closeModal(): void {
    this.dialogRef.close(null);
  }

  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 1;
  }
 
  formChanged() {
    this.wasFormChanged = true;
  }  
  resetPerspective() {

  }
 
}
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MainLayoutService } from '../../../main-layout/main-layout-service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.sass']
})
export class ConfirmationComponent implements OnInit { 
  modalData: any;
  @ViewChild('matDialog') matDialog: ElementRef;
  constructor(private mainLayoutService: MainLayoutService, 
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.modalData = JSON.parse(JSON.stringify(data));
  } 
  ngOnInit(): void {
  } 
  yesFn(){ 
    this.dialogRef.close('yes');
  }
  noFn(){
    this.dialogRef.close(null);
  }
}

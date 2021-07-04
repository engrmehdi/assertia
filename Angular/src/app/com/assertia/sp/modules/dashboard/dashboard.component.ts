import { Component, OnInit, ViewChildren } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html', 
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit { 
  constructor() {  
  }
  ngOnInit(): void { } 
}

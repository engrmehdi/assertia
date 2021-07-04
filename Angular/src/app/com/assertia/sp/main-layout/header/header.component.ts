import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RoutingService } from '../../common/services/routing-service'; 
import { BaseClass } from '../../utils/baseclass'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent extends BaseClass implements OnInit { 
  @Output() closeSideNav = new EventEmitter<any>();
  constructor(public formBuilder: FormBuilder,
              public routingService: RoutingService) {
    super();  
   }

  ngOnInit(): void {
  } 
  toggleSideNav(){
    this.closeSideNav.emit('true');
  } 
}

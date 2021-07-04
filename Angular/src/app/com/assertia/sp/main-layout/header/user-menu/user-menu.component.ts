import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { RouteConstants } from '../../../utils/constants/route-constants';
import { Subscription } from 'rxjs';
import { RoutingService } from '../../../common/services/routing-service';
import { MainLayoutService } from '../../main-layout-service';
import { RouteParams } from '../../../utils/model.route-params'; 

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.sass']
})
export class UserMenuComponent implements OnInit {
  userInfo:any;
  subscription: Subscription;
  constructor(private loginService : LoginService, 
              private mainLayoutService: MainLayoutService) { 
      this.userInfo = this.mainLayoutService.getloggedInUser(); 
  }

  ngOnInit(): void {
  } 
  logOut() { 
    this.loginService.logout();
  } 
  ngOnDestroy() {
  }  
}

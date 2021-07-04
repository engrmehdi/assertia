import { Component, OnInit, HostListener, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MediaObserver } from '@angular/flex-layout'; 
import { BaseClass } from '../utils/baseclass'; 
import { RouteConstants } from '../utils/constants/route-constants';
import { RoutingService } from '../common/services/routing-service';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.sass']
})
export class MainLayoutComponent extends BaseClass implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  opened = true;
  over = 'side';
  expandHeight = '42px';
  collapseHeight = '42px';
  displayMode = 'flat';
  errorMessage: string;
  header: any = 'Home';
  watcher: Subscription;
  sidenavIsOpened: boolean = true; 
  @ViewChild('sideNav') sideNav: any;
  menu: any [] = [
    {
      displayName: 'Dashboard',
      iconName: 'desktop_windows',
      route: RouteConstants.DASHBOARD,
    }, 
    {
      displayName: 'Assertia',
      iconName: 'description',          
      children: [
        {
          displayName: 'Setups',
          iconName: 'how_to_reg', 
          children: [ 
            { 
              displayName: 'Users',
              iconName: 'how_to_reg',
              route: RouteConstants.USERS_LIST 
            }
          ]
        },
      ]
    }
  ];

  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router, @Inject(MediaObserver) media) {
    super()
  }

  ngOnInit() { 
    this.getMenu();
  }
  getMenu(){

  }
  public toggleSidenav(menuId) {
    this.sideNav.toggle(); 
    this.sidenavIsOpened = !this.sidenavIsOpened;
  } 

  @HostListener('window:resize')
  public onWindowResize(): void {
    if (window.innerWidth <= 599) {
      this.sidenavIsOpened = false;

    }
    else {
      this.sidenavIsOpened = true;

    }
  }
 openRoute(route){
  this.routingService.navigate(route); 
 }
}

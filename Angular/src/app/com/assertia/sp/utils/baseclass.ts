import { OnInit, AfterViewInit, OnDestroy, Component } from '@angular/core';
import { RoutingService } from '../common/services/routing-service';
import { AppInjector } from './AppInjector'; 
import { AlertService } from 'src/app/core-services/alert.service';
import { TokenStorageService } from 'src/app/core-services/token.storage.service'; 
import { MainLayoutService } from '../main-layout/main-layout-service';
import { FormGroup } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { RouteParams } from './model.route-params';
import { LoaderService } from 'src/app/core-services/loader.service';
import { timer } from 'rxjs'; 

@Component({
  selector: 'base-class',
  template: ``
})

export class BaseClass implements OnInit, AfterViewInit, OnDestroy {
  protected routingService: RoutingService
  protected alertService: AlertService
  protected tokenStorage: TokenStorageService
  protected mainLayoutService: MainLayoutService 
  protected loaderService: LoaderService
  protected appRouter: Router
  protected activateRoute: ActivatedRoute
  protected user: any;
  protected pageParams: RouteParams;
  public routedPageState: any; 
  currentNavigation: any; 
  constructor() {
    let injector = AppInjector.getInjector();
    if (injector) {
      this.routingService = injector.get(RoutingService);
      this.appRouter = injector.get(Router); 
      this.alertService = injector.get(AlertService);
      this.tokenStorage = injector.get(TokenStorageService);
      this.loaderService = injector.get(LoaderService);
      this.mainLayoutService = injector.get(MainLayoutService); 
      this.activateRoute = injector.get(ActivatedRoute);      
    }
    this.user = this.tokenStorage.getUser();
    this.currentNavigation = this.appRouter.getCurrentNavigation();
  }

  ngOnInit() {
    this.showLoader();
  } 
  ngAfterViewInit() { 
  } 
  reloadCurrentPage(router, routeParams) {
    this.appRouter.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.routingService.openPage(router, routeParams);
    });
  }

  showLoader() {
    this.loaderService.enableLoading();
  }

  hideLoader() {
    timer(300).subscribe(val => {
      this.loaderService.clearLoading();
    })
  }

  ngOnDestroy() { }

  bindJsonObjectToFormObject(dataObject: any, formObject: FormGroup) {
    if (dataObject) {
      const keys = Object.keys(formObject.controls);
      keys.forEach(key => {
        formObject.patchValue({
          [key]: dataObject[key]
        })
        formObject.controls[key].valueChanges.subscribe(
          (newValue) => {
            dataObject[key] = newValue;
          }
        )
      });
    }
  } 
}
import { Injectable } from '@angular/core';  
import { Params, Router, ActivatedRoute } from '@angular/router'; 
import { RouteParams } from '../../utils/model.route-params';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  constructor(private router:Router,private activatedRoute : ActivatedRoute) {} 

  openPage(routerLink, params = null){  
    this.navigate(routerLink,params); 
  } 

  navigate(routerLink:any,routeParams:any = null){
    let myParam:Params = {routerLink : routerLink, refresh: new Date().getTime(),id:routeParams?routeParams.id:null}; 
    return this.router.navigate([routerLink],{skipLocationChange: true, queryParams: myParam, state: routeParams });
  } 
}

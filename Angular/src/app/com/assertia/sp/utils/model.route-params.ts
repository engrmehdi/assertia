export class RouteParams{  
    public id:number = null; 
    public name:string = null;
    public moduleId: number = -1;
    public title:string = null;
    public data:Object = new Object();
    public pageState:number = null;
    public parentParams:RouteParams = null;  
    public refreshTime: any = null;
    public routerLink : string = null;
    public displayType : number = null;
}
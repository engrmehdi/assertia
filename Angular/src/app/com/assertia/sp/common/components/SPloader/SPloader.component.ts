import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/core-services/loader.service';
import { NavigationStart, Router, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-sploader',
  templateUrl: './SPloader.component.html',
  styleUrls: ['./SPloader.component.sass']
})
export class SPLoaderComponent {

  loader: any;
  loaderSubscription: Subscription;

  constructor(public loaderService : LoaderService, private router : Router) {
    this.loaderSubscription = this.loaderService.onLoader()
    .subscribe(loader => {
      this.loader = loader;
    });
    // this.router.events.subscribe((event) => {
    //   switch (true) {
    //     case event instanceof NavigationStart: {
    //       this.loader = true;
    //       break;
    //     }
    //   }
    // }); 
  }

}

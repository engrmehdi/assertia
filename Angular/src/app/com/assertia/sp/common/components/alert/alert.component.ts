import { Component, OnInit, OnDestroy, Input, Inject } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert, AlertType } from '../../../models/alert';
import { AlertService } from 'src/app/core-services/alert.service';
import {MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription: Subscription;
  routeSubscription: Subscription;

  constructor(private router: Router, private alertService: AlertService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
      this.alertSubscription = this.alertService.onAlert(this.id)
          .subscribe(alert => {
            this.alerts = [];
              if (!alert.message) {
                  this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);
                  this.alerts.forEach(x => delete x.keepAfterRouteChange);
                  return;
              }
              this.alerts.push(alert);
              this.showsnakbar();
              if (alert.autoClose) {
                  setTimeout(() => this.removeAlert(alert), 3000);
              }
         });

      this.routeSubscription = this.router.events.subscribe(event => {
          if (event instanceof NavigationStart) {
              this.alertService.clear(this.id);
          }
      });
  }

  showsnakbar(){
    this._snackBar.openFromComponent(SnakbarComponent, {
      duration: 5000,
      verticalPosition: 'top',
      data: this.alerts,
      panelClass: 'fx-mat-snakbar'
    });
  }

  ngOnDestroy() {
      this.alertService.clear();
      this.alertSubscription.unsubscribe();
      this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
      if (!this.alerts.includes(alert)) return;
      if (this.fade) {
          alert.fade = true;
          setTimeout(() => {
              this.alerts = this.alerts.filter(x => x !== alert);
          }, 1000);
      } else {
          this.alerts = this.alerts.filter(x => x !== alert);
      }
  }

}

@Component({
  selector: 'app-snakbar-alert',
  templateUrl: './snakbar.component.html',
  styleUrls: ['./alert.component.sass']
})
export class SnakbarComponent implements OnInit{

  alerts : Alert[] = [];

  constructor(public sbRef: MatSnackBarRef<SnakbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private alertService: AlertService){}

    ngOnInit() {
      this.alerts = this.data
    }

    ngOnDestroy(){
      this.alertService.clear();
    }

    cssClass(alert: Alert) {
      if (!alert) return;
      const classes = ['alert', 'alert-dismissable', 'mt-4', 'container'];
      const alertTypeClass = {
          [AlertType.Success]: 'fx-success',
          [AlertType.Error]: 'fx-danger',
          [AlertType.Info]: 'fx-info',
          [AlertType.Warning]: 'fx-warning'
      }
      classes.push(alertTypeClass[alert.type]);
      return classes.join(' ');
    }

}
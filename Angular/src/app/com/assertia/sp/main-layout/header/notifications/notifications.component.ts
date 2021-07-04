import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.sass']
})
export class NotificationsComponent implements OnInit {
 
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public notifications:Array<Object>;
  constructor(private messagesService:NotificationService) { 
    this.notifications = messagesService.getNotificaton(); 
  }
  
  ngOnInit(): void {
  }
  openMenu() {
    this.trigger.openMenu(); 
  }
}

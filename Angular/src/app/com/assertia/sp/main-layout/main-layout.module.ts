import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MainLayoutComponent } from './main-layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component'; 
import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { FilterPipe } from '../common/pipes/filter.pipe';
import { NotificationsComponent } from './header/notifications/notifications.component';
import { HelpComponent } from './header/help/help.component';
import { UserMenuComponent } from './header/user-menu/user-menu.component'; 
import { SearchComponent } from './header/search/search.component';
import { DashboardComponent } from '../modules/dashboard/dashboard.component'; 
import { ComponentsModule } from '../common/components/components.module';
import { SPLoaderComponent } from '../common/components/SPloader/SPloader.component'; 
import { UsersListComponent } from '../modules/setups/users-list/users-list.component'; 
import { AddUserComponent } from '../modules/setups/add-user/add-user.component';


@NgModule({
  declarations: [MainLayoutComponent, HeaderComponent, FooterComponent,
        DashboardComponent,
        NotificationsComponent, 
        SPLoaderComponent,
        HelpComponent,
        UserMenuComponent,  
        SearchComponent,
        FilterPipe,
        UsersListComponent,
        AddUserComponent,
     
      ],
  imports: [      
    ComponentsModule,
    MainLayoutRoutingModule, 
  ],
  exports:[],
  providers: [],
  bootstrap: [MainLayoutComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainLayoutModule {}

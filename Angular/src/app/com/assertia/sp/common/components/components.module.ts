import { NgModule } from '@angular/core'; 
import { AppSharedModule } from 'src/app/app.shared.module'; 
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/auth-helpers/jwt.interceptor';
import { ErrorInterceptors } from 'src/app/auth-helpers/error.interceptors'; 
import { SearchInListFilterPipe } from '../pipes/search-in-list-filter.pipe';
import { ConfirmationComponent } from './confirmation/confirmation.component'; 

@NgModule({
  declarations: [  
    SearchInListFilterPipe,
    ConfirmationComponent,
  ],
  imports: [
    AppSharedModule
  ],
  exports: [
    AppSharedModule,   
    SearchInListFilterPipe, 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptors, multi: true }
  ],
  entryComponents:[ConfirmationComponent]
})
export class ComponentsModule { }

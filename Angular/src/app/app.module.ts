import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './auth-helpers/jwt.interceptor';
import { ErrorInterceptors } from './auth-helpers/error.interceptors';
import { AlertComponent, SnakbarComponent } from './com/assertia/sp/common/components/alert/alert.component';
import { ComponentsModule } from './com/assertia/sp/common/components/components.module';
import { MainLayoutModule } from './com/assertia/sp/main-layout/main-layout.module';
import { ApplicationLoaderComponent } from './application-loader/application-loader.component'; 
@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    ApplicationLoaderComponent,
    SnakbarComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    LoginModule,
    MainLayoutModule, 
  ],
  exports:[], 
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptors, multi: true }
  ],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}

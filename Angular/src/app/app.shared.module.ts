import { NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common'; 
import { AppInjector } from './com/assertia/sp/utils/AppInjector';
import { AngularMaterialModule } from './app.material.module';
import { MatTableExporterModule } from 'mat-table-exporter';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,  
    FlexLayoutModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    MatTableExporterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports:[
    CommonModule,
    FormsModule,  
    FlexLayoutModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    TranslateModule,
    MatTableExporterModule
  ],
  providers: [],
  bootstrap: [],
  schemas: []
})
export class AppSharedModule {
  constructor(private injector: Injector,
      public translate: TranslateService) {
    AppInjector.injector = this.injector;
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
  }
}

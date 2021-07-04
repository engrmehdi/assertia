import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../app.material.module';
import { ComponentsModule } from '../com/assertia/sp/common/components/components.module';

export const routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    ComponentsModule,
    AngularMaterialModule,    
    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }

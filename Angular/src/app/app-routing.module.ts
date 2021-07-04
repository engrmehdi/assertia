import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth-helpers/auth.guard';
import { ApplicationLoaderComponent } from './application-loader/application-loader.component'; 

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)}, 
  { path: 'assertia', loadChildren: () => import('./com/assertia/sp/main-layout/main-layout.module').then(m => m.MainLayoutModule),canActivate: [AuthGuard] },
  { path: '', component: ApplicationLoaderComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true ,
      onSameUrlNavigation: "reload"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

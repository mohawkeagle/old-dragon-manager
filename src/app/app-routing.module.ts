import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './layout/welcome/welcome.component';
import { AuthenticationGuard } from './shared/guards//authentication.guard';
import { AuthenticatedGuard } from './shared/guards//authenticated.guard';

const appRoutes: Routes = [
  {path: "", redirectTo: 'welcome', pathMatch: 'full'},
  {
    path: 'example',
    loadChildren: `app/+example/example.module#ExampleModule`
  },
  {
    path: 'login',
    loadChildren: `app/+login/login.module#LoginModule`
  },
  {
    path: 'main',
    canActivate: [AuthenticationGuard],
    loadChildren: `app/+main/main.module#MainModule`
  },
  {
    path: "welcome",
    canActivate: [AuthenticatedGuard],
    component: WelcomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  declarations: [],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

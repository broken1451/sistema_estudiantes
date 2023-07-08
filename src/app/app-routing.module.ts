import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/public/login/login.component';
import { AuthGuard } from './modules/public/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'private',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/public/login/login.module').then((m) => m.LoginModule),
  },
  // {
  //   path: 'register',
  //   loadChildren: () =>
  //     import('./modules/public/register/register.module').then((m) => m.RegisterModule),
  // },
  {
    path: 'private',
    loadChildren: () =>
      import('./modules/private/private.module').then((m) => m.PrivateModule),
      canActivate: [AuthGuard]
  },
  {
    path: '**',
    // redirectTo: 'private',
    loadChildren: () =>
      import('./shared/page404/page404.module').then((m) => m.Page404Module),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

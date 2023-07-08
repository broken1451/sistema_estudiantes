import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private.component';


const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadChildren: () =>
        import('./home/home.module').then((m) => m.HomeModule),
        data: {titulo: 'Home', descrip: 'Esto es la pagina principal'} 
      },
      {
        path: 'perfil',
        loadChildren: () =>
        import('./profile/profile.module').then((m) => m.ProfileModule),
        data: {titulo: 'Profile', descrip: 'Pagina de perfil'} 
      },
      {
        path: '**',
        redirectTo: 'home',
        // loadChildren: () =>
        //   import('../../shared/page404/page404.module').then((m) => m.Page404Module),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
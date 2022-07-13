import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'default', 
    loadChildren: () => import('./pages/default.module').then(m => m.DefaultModule) 
  },
  {
    path: '**',
    redirectTo: '/default/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

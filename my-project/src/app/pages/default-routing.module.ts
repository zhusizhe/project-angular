import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default.component';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { ReportComponent } from './report/report.component';
import { CanDeactivateGuardService } from '../services/canDeactivateGuardService';

const routes: Routes = [
  {
    path:'',
    component:DefaultComponent,
    children:[
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'report',
        component:ReportComponent
      },
      {
        path: 'add',
        component:AddComponent,
        canDeactivate: [CanDeactivateGuardService],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }

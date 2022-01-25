import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllRepairComponent } from './all-repair/all-repair.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reparaciones'
    },
    children: [
      {
        path: '',
        redirectTo: 'all'
      },
      {
        path: 'all',
        component: AllRepairComponent,
        data: {
          title: 'Todas las Repaciones'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepairsRoutingModule { }

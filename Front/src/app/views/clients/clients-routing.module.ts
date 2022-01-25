import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllClientComponent } from './all-client/all-client.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Clientes'
    },
    children: [
      {
        path: '',
        redirectTo: 'all'
      },
      {
        path: 'all',
        component: AllClientComponent,
        data: {
          title: 'Todos los Clientes'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }

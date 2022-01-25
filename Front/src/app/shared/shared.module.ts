import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { PaginationModule } from '@coreui/angular';

//Material
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    PaginationModule,
    MatPaginatorModule,
    MatTableModule
  ],
  exports: [PaginatorComponent]
})
export class InnpactiaSharedModule { }

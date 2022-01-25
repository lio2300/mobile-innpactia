import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatTableDataSource } from '@angular/material/table';
import { RepairService } from 'src/app/services/repair.service';
import * as ClientsInterfaces from '../../interface';

@Component({
  selector: 'app-repair-client',
  templateUrl: './repair-client.component.html',
  styleUrls: ['./repair-client.component.scss']
})
export class RepairClientComponent implements OnInit {

  public dataSource: MatTableDataSource<ClientsInterfaces.RepairData> = new MatTableDataSource<ClientsInterfaces.RepairData>([]);
  public displayedColumns: string[] = ['reapir_ingr', 'repair_sali', 'reapir_desc_ingr', 'repair_desc_sali'];


  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ClientsInterfaces.Mobiledata,
    public _RepairService: RepairService
  ) {
    this._RepairService.API_REPAIR('SHARED', { pk_mobile: this.data.pk_mobile }).subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
    });

  }

  ngOnInit(): void {
  }

}

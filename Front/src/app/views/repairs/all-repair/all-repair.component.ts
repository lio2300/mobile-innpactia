import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RepairService } from 'src/app/services/repair.service';
import { PaginatorModel } from 'src/app/shared/interface/paginator';
import * as RepairsInterface from "../interfaces"
import { NewRepairComponent } from "../dialogs/new-repair/new-repair.component"
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-all-repair',
  templateUrl: './all-repair.component.html',
  styleUrls: ['./all-repair.component.scss']
})
export class AllRepairComponent implements OnInit, AfterViewInit {

  public displayedColumns: string[] = ['repair_ingr', 'repair_sali', 'repair_desc_ingr', 'repair_desc_sali'];
  public dataSource: MatTableDataSource<RepairsInterface.RepariData> = new MatTableDataSource<RepairsInterface.RepariData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public dataModel: PaginatorModel = {
    limit: 10,
    offset: 0,
    count: 0,
    pageIndex: 0,
    opcion: "S",
    search: '',
  };


  constructor(
    public _RepairService: RepairService,
    public DialogAddRepair: MatBottomSheet,
  ) {

    this.LoadData();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  LoadData() {
    this._RepairService.API_REPAIR(this.dataModel.opcion, this.dataModel).subscribe(resp => {
      let data: RepairsInterface.RepariData[] = resp;
      // console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
  }

  ShowFormRepairs() {
    const dialogRef = this.DialogAddRepair.open(NewRepairComponent);
    dialogRef.afterDismissed().subscribe((dismiss) => {
      // Restore focus to an appropriate element for the user's workflow here.
      if (dismiss) {
        this.LoadData();
      }
    });
  }

  getData(page: any) {
    let { length, pageIndex, pageSize, previousPageIndex } = page;
    this.dataModel.limit = pageSize;
    this.dataModel.pageIndex = pageIndex;
    this.dataModel.offset = pageIndex * this.dataModel.limit;
    this.LoadData();
  }
}

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from '../../../services/client.service';
import * as ClientsInterfaces from '../interface';
import { PaginatorModel } from "src/app/shared/interface/paginator";
import { MatDialog } from '@angular/material/dialog';
import { MobileClientComponent } from '../dialogs/mobile-client/mobile-client.component';
import { AddClientComponent } from '../dialogs/add-client/add-client.component';

@Component({
  selector: 'app-all-client',
  styleUrls: ['all-client.component.scss'],
  templateUrl: 'all-client.component.html',
})
export class AllClientComponent implements AfterViewInit {
  public displayedColumns: string[] = ['client_firstname', 'client_lastname', 'client_reference', 'client_address', 'acciones'];
  public dataSource: MatTableDataSource<ClientsInterfaces.UserData> = new MatTableDataSource<ClientsInterfaces.UserData>([]);

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
    public _ClientService: ClientService,
    public DialogMobile: MatDialog,
    public DialogAddClient: MatDialog
  ) {
    this.LoadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  LoadData() {
    this._ClientService.API_CLIENT(this.dataModel.opcion, this.dataModel).subscribe(resp => {
      let data: ClientsInterfaces.UserData[] = resp;
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
  }

  ShowMobile(mobile: ClientsInterfaces.UserData) {
    const dialogRef = this.DialogMobile.open(MobileClientComponent, { data: mobile, width: '900px' });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ShowFormAdd() {
    const dialogRef = this.DialogAddClient.open(AddClientComponent, { width: '900px' });

    dialogRef.afterClosed().subscribe(result => {
      this.LoadData();
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


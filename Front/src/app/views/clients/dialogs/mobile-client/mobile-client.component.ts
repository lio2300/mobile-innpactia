import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MobileService } from 'src/app/services/mobile.service';
import * as ClientsInterfaces from '../../interface';
import { RepairClientComponent } from "../repair-client/repair-client.component";

@Component({
  selector: 'app-mobile-client',
  templateUrl: './mobile-client.component.html',
  styleUrls: ['./mobile-client.component.scss']
})
export class MobileClientComponent implements OnInit, AfterViewInit {
  public dataSource: MatTableDataSource<ClientsInterfaces.Mobiledata> = new MatTableDataSource<ClientsInterfaces.Mobiledata>([]);

  public displayedColumns: string[] = ['mobile_marca', 'mobile_model', 'mobile_year', 'mobile_color', 'mobile_inch', 'mobile_IMEI', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public FormMobile: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<MobileClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientsInterfaces.UserData,
    private BuilderMobile: FormBuilder,
    private _snackBar: MatSnackBar,
    public DialoRepair: MatBottomSheet,
    public _MobileService: MobileService,
  ) {
    this.FormMobile = this.BuilderMobile.group({
      // pk_mobile: ['', Validators.required],
      mobile_marca: ['', Validators.required],
      mobile_model: ['', Validators.required],
      mobile_year: ['', Validators.required],
      mobile_color: ['', Validators.required],
      mobile_inch: ['', Validators.required],
      mobile_IMEI: ['', Validators.required],
      fk_client: [this.data.pk_client, Validators.required]
    });
    this.LoadData();
  }

  ngOnInit(): void {
  }

  LoadData() {
    this._MobileService.API_MOBILE('SHARED', { pk_client: this.data.pk_client }).subscribe(resp => {
      console.log(resp);
      this.dataSource = new MatTableDataSource(resp);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  SendToDataServer() {
    if (!this.FormMobile.invalid) {
      let datos = this.FormMobile.getRawValue();
      this._MobileService.API_MOBILE('I', datos).subscribe(resp => {
        this.LoadData();
      });
    } else {
      this._snackBar.open('Existen campos vacíos', 'Aceptar', { duration: 3000 });
    }

  }

  ShowRepair(repair: ClientsInterfaces.Mobiledata) {
    const dialogRef = this.DialoRepair.open(RepairClientComponent, { data: repair, panelClass: 'custom-width' });
  }

}

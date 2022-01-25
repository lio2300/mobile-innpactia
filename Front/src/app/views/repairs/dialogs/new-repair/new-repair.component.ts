import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RepairService } from 'src/app/services/repair.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-new-repair',
  templateUrl: './new-repair.component.html',
  styleUrls: ['./new-repair.component.scss']
})
export class NewRepairComponent implements OnInit {

  public FormRepair: FormGroup;

  constructor(
    private BuilderRepair: FormBuilder,
    public _RepairService: RepairService,
    public dialogRef: MatBottomSheetRef<NewRepairComponent>,
    private _snackBar: MatSnackBar,
    public datepipe: DatePipe,
  ) {
    this.FormRepair = this.BuilderRepair.group({
      repair_ingr: ['', Validators.required],
      repair_sali: ['', Validators.required],
      repair_desc_ingr: ['', Validators.required],
      repair_desc_sali: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  SendDataToServer() {
    if (!this.FormRepair.invalid) {
      let datos = this.FormRepair.getRawValue();
      console.log(datos);
      datos.repair_ingr = this.datepipe.transform(datos.repair_ingr, 'yyyy-MM-dd');
      datos.repair_sali = this.datepipe.transform(datos.repair_sali, 'yyyy-MM-dd');
      this._RepairService.API_REPAIR('I', datos).subscribe(resp => {
        this.dialogRef.dismiss(true);
      });
    } else {
      this._snackBar.open('Existen campos vacíos', 'Aceptar', { duration: 3000 });
    }
  }

}

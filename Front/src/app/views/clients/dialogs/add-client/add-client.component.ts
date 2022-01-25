import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  public FormClient: FormGroup;

  constructor(
    private BuilderClient: FormBuilder,
    public _ClientService: ClientService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddClientComponent>,

  ) {
    this.FormClient = this.BuilderClient.group({
      client_dni: ['', Validators.required],
      client_firstname: ['', Validators.required],
      client_lastname: ['', Validators.required],
      client_address: ['', Validators.required],
      client_reference: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  SendDataToServer() {
    if (!this.FormClient.invalid) {
      let datos = this.FormClient.getRawValue();
      this._ClientService.API_CLIENT('I', datos).subscribe(resp => {
        this.dialogRef.close(true);
      });
    } else {
      this._snackBar.open('Existen campos vacíos', 'Aceptar', { duration: 3000 });
    }
  }

}

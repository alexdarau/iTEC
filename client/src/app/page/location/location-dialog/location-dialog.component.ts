import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.scss']
})
export class LocationDialogComponent implements OnInit {

  form: FormGroup;
  @Inject(MAT_DIALOG_DATA) data: { description: string; } ;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LocationDialogComponent>
  ) {
   }

  ngOnInit(): void {

    this.form = this.fb.group({
      deskName: new FormControl('', Validators.required)
  });
  }

  create() {
    this.dialogRef.close(this.form.value);
}

    close() {
        this.dialogRef.close();
    }

}

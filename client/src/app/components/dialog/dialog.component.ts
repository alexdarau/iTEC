import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  form: FormGroup;
  description:string;
  @Inject(MAT_DIALOG_DATA) data: { description: string; } ;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<DialogComponent>) {

        this.description = this.data?.description;
    }

    ngOnInit() {
        this.form = this.fb.group({
            description: [this.description, []]
        });
    }

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

}

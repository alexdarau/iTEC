import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  form: FormGroup;
  description:string;
  public dataToSelect = [];
  selectedFile: File;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) data: any,
        private dialogService: DialogService
        
        ) {
        console.log(data)
        this.description = data?.description;
        this.dataToSelect = data?.offices
    }

    ngOnInit() {
        this.form = this.fb.group({
            selectedData: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required)
        });
    }

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

    onUpload() {
        // this.http is the injected HttpClient
        const uploadData = new FormData();
        uploadData.append('image', this.selectedFile, this.selectedFile.name);
        console.log('uploadData', uploadData.getAll('image'));
        console.log('selectedFile', this.selectedFile);
        this.dialogService.createFloor(uploadData)
        // this.http.post('my-backend.com/file-upload', uploadData)
        //   .subscribe();
      }
      onFileChanged(event: any) {
        this.selectedFile = event.target.files[0];
      }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBase } from 'src/app/api-base';

@Injectable({
  providedIn: 'root'
})
export class DialogService extends ApiBase{

  constructor( http: HttpClient) {
    super(http);
  }

  // Initialize the available routes
  protected override initEndpoints() {
    this.setEndpoints({
      floor: 'floor',
    })
  }

  private create(data:any) {
    return this.post(this.buildURL('floor'), {file: data}, false, true);
  }

  createFloor(data:any) {
    console.log('data', data)
    this.create(data).subscribe(res =>
      console.log('res', res)
      )
  }
}

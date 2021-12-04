import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-data-viewer',
  templateUrl: './dialog-data-viewer.component.html',
  styleUrls: ['./dialog-data-viewer.component.scss']
})
export class DialogDataViewerComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);

  }
  
  ngOnInit() {
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-sucessdialog',
  templateUrl: './sucessdialog.component.html',
  styleUrls: ['./sucessdialog.component.scss']
})
export class SucessdialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SucessdialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}

import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toster',
  templateUrl: './toster.component.html',
  styleUrls: ['./toster.component.css']
})
export class TosterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  snackBarRef = inject(MatSnackBarRef);

}

import { Component } from '@angular/core';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-place-order-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButton],
  templateUrl: './place-order-dialog.component.html',
  styleUrl: './place-order-dialog.component.scss',
})
export class PlaceOrderDialogComponent {}

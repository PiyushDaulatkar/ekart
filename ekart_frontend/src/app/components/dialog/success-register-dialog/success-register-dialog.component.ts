import { Component } from '@angular/core';
import { MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-success-register-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose,
    MatButton
  ],
  templateUrl: './success-register-dialog.component.html',
  styleUrl: './success-register-dialog.component.scss'
})
export class SuccessRegisterDialogComponent {

}

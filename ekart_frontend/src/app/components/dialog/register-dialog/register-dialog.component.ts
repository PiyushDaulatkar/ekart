import { Component } from '@angular/core';
import { MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-register-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose,
    MatButton
  ],
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.scss'
})
export class RegisterDialogComponent {

}

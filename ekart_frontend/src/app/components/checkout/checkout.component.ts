import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { NgIf } from '@angular/common';
import { PlaceOrderDialogComponent } from '../dialog/place-order-dialog/place-order-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    PageNotFoundComponent,
    NgIf,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  token: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {
    if (typeof window !== 'undefined') {
      if (typeof localStorage !== 'undefined') {
        const token = window.localStorage.getItem('token');
        this.token = token ?? '';
      }
    }
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    cardDetails: [''],
    upiDetails: [''],
    codDetails: [''],
  });
  isLinear = true;

  paymentMethods: any[] = [
    { method: 'UPI', placeHolder: 'Enter UPI ID' },
    { method: 'Credit/Debit card', placeHolder: 'Enter UPI ID' },
    { method: 'COD', placeHolder: '' },
  ];

  placeOrder() {
    let dialogref = this.dialog.open(PlaceOrderDialogComponent);

    dialogref.afterClosed().subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
    });
  }
}

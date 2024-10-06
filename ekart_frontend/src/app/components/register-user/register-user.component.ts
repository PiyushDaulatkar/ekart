import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { UserRegisterService } from '../../Services/user-register.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog'
import { RegisterDialogComponent } from '../dialog/register-dialog/register-dialog.component';
import { SuccessRegisterDialogComponent } from '../dialog/success-register-dialog/success-register-dialog.component';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule,MatInputModule, MatButtonModule,
    RouterModule, MatIconModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {
  userRegisterForm: FormGroup;

  constructor(private router: Router, private service: UserRegisterService,
    private dialog: MatDialog
  ) {
    this.userRegisterForm = new FormGroup({
      firstName: new FormControl("",[Validators.required]),
      lastName: new FormControl("",[Validators.required]),
      username: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required])  
  
    })
  }

  respData: any;

  proceedRegistration(loginData: any) {
    if(loginData.valid) {
      this.service.proceedRegistration(loginData.value).subscribe({ 
        next: (res) => {
        this.respData = res;
          if(this.respData != null) {
            let dialogref = this.dialog.open(SuccessRegisterDialogComponent);

            dialogref.afterClosed().subscribe({
              next: (res) => {
                this.router.navigate(['/login']);
              }
            })
          }
          else {
            console.log(this.respData);
          }
      },
    error: (err) => {
      this.openDialog();
    }})
    }

  }

  openDialog() {
    this.dialog.open(RegisterDialogComponent);
  }


}
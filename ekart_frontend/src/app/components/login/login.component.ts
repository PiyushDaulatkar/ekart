import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { UserService } from '../../Services/user.service';
import { Router, RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { setUserName } from '../../shared/store/username.action';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,FormsModule, MatFormFieldModule, MatInputModule,MatButtonModule, RouterModule, MatIconModule],
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  constructor(private service:UserService, private router: Router,
    private store: Store<{ userName : {userName: string}}>
  ) {}
  

  // ngOnInit(): void {
  //   localStorage.clear();
  // }

  respData: any;

  proceed(loginData: any) {
    console.log(1);
    if(loginData.valid) {
      console.log(2);
      this.service.proceedLogin(loginData.value).subscribe(res => {
        console.log(3);
        this.respData=res;
         if(this.respData!=null) {
          console.log(4);
          localStorage.setItem('token',this.respData.token);
          this.store.dispatch(setUserName({ value: loginData.value.username}));
          //console.log('value:'+ loginData.value.password);
          this.router.navigate(['/products']);
         }
         if(this.respData == null)
          {console.log(6);
          alert('Invalid credentials !!')}
         console.log(5);
      });
      
    }
  }

  proceedLogin(loginData: any) {
    if(loginData.valid) {
      this.service.proceedLogin(loginData.value).subscribe(
        {
          next: (res: any) => {
            this.respData=res;
            if(this.respData!=null) {
              localStorage.setItem('token',this.respData.token);
              this.store.dispatch(setUserName({ value: loginData.value.username}));
              this.router.navigate(['/products']);
             }
          },
          error: (err) => {
            alert('Invalid credentials !! , if new user please register');
          }
        }
      );
      
    }
  }
}
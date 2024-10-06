import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  userName!: string;

  constructor(private store: Store<{ userName: { userName: string } }>) {}

  ngOnInit(): void {
    this.store.select('userName').subscribe((data) => {
      this.userName = data.userName;
    });
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', '');
    }
  }
}

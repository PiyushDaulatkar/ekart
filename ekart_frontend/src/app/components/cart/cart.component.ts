import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../interfaces/product';
import { CartService } from '../../Services/cart.service';
import { NgIf, NgFor } from '@angular/common';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe,
    RouterModule,
    NgIf,
    NgFor,
    PageNotFoundComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cart: Product[] = [];
  total: number = 0;

  token: string = '';

  ngOnInit(): void {
    this.fetchCart();
  }

  constructor(private cartService: CartService, private router: Router) {
    if (typeof window !== 'undefined') {
      if (typeof localStorage !== 'undefined') {
        const token = window.localStorage.getItem('token');
        this.token = token ?? '';
      }
    }
  }

  fetchCart() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        if (res != null) {
          this.cart = res;
          this.cart.map((product) => {
            product.isDecrDisabled = false;
          });
        }
      },
      complete: () => {
        this.addCalculateTotal();
      },
    });
  }

  increaseQuantity(id: number) {
    let product = this.cart.find((product) => {
      return product.id == id;
    });
    if (product) {
      if (product.quantity < product.stock) {
        product.quantity++;
        product.isDecrDisabled = false;
      }
      if (product.quantity == product.stock) {
        product.isDecrDisabled = false;
        product.isIncrDisabled = true;
      }
      this.addCalculateTotal();
    }
  }

  decreaseQuantity(id: number) {
    let product = this.cart.find((product) => {
      return product.id == id;
    });
    if (product) {
      if (product.quantity > 0) {
        product.quantity--;
        product.isIncrDisabled = false;
      }
      if (product.quantity == 0) {
        product.isDecrDisabled = true;
        this.removeFromCart(product.id);
      }
      this.addCalculateTotal();
    }
  }

  removeFromCart(id: number) {
    this.cart = this.cart.filter((product) => {
      return product.id != id;
    });
    this.cartService.removeProductFromCart(id).subscribe();

    this.addCalculateTotal();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }

  addCalculateTotal() {
    let temp = 0;
    for (const product of this.cart) {
      temp += product.price * product.quantity;
      this.total = temp;
    }
  }
}

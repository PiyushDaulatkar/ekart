import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../interfaces/product';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe,
    RouterModule,
    FormsModule,
    CommonModule,
    PageNotFoundComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  products: Product[] = [];
  tempProducts: Product[] = [];
  searchText: string = '';

  ngOnInit(): void {
    this.fetchProducts();
  }

  token: string = '';

  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {
    if (typeof window !== 'undefined') {
      if (typeof localStorage !== 'undefined') {
        const token = window.localStorage.getItem('token');
        this.token = token ?? '';
      }
    }
  }

  fetchProducts() {
    this.productService.getProducts().subscribe((res) => {
      if (res != null) {
        this.products = res;
        this.tempProducts = res;
      }
    });
  }

  increaseQuantity(id: number) {
    let product = this.products.find((product) => {
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
    }
  }

  decreaseQuantity(id: number) {
    let product = this.products.find((product) => {
      return product.id == id;
    });
    if (product) {
      if (product.quantity > 0) {
        product.quantity--;
        product.isIncrDisabled = false;
      }
      if (product.quantity == 0) {
        product.isDecrDisabled = true;
      }
    }
  }

  addToCart(id: number, quantity: number) {
    this.cartService.addToCart(id, quantity).subscribe((res) => {
      alert('Product added to cart');
      if (this.products[id - 1].quantity == 0) {
        this.products[id - 1].quantity = 1;
        this.products[id - 1].isDecrDisabled = false;
      }
    });
  }

  buyProduct(id: number, quantity: number) {
    this.addToCart(id, quantity);
    this.router.navigate(['/cart']);
  }

  searchProducts() {
    if (this.searchText === '') {
      this.products = this.tempProducts;
    } else {
      this.products = this.tempProducts.filter((product) => {
        if (
          product.name
            .toLocaleLowerCase()
            .includes(this.searchText.toLowerCase())
        )
          return true;
        return false;
      });
    }
  }
}

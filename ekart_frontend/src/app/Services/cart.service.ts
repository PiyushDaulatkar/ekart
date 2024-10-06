import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {}

  getCart(): Observable<Product[]> {
    let token = this.document.defaultView?.localStorage.getItem('token');
    const headers = { Authorization: 'Bearer ' + token };
    return this.http.get<Product[]>('http://localhost:3000/cart', { headers });
  }

  addToCart(id: number, quantity: number): Observable<any> {
    let token = this.document.defaultView?.localStorage.getItem('token');
    const headers = { Authorization: 'Bearer ' + token };
    return this.http.post<any>(
      `http://localhost:3000/cart/${id}`,
      this.getQuantity(quantity),
      { headers }
    );
  }

  getQuantity(quantity: number): any {
    return { quantity: quantity };
  }

  removeProductFromCart(id: number) {
    let token = this.document.defaultView?.localStorage.getItem('token');
    const headers = { Authorization: 'Bearer ' + token };
    return this.http.delete<any>(`http://localhost:3000/cart/${id}`, {
      headers,
    });
  }
}

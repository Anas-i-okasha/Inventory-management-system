import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from './products.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  baseURL = 'http://localhost:5000/products';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllProdects() {
    return this.httpClient.get(`${this.baseURL}/get-all-products`)
  }

  addItem(productDto: any) {
    return this.httpClient.post(`${this.baseURL}/add-new-product`, productDto);
  }
}

import { Component, OnInit } from '@angular/core';
import { Products } from './products.model';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    private transactionService: TransactionService
  ) { }
  products: any[] = [];
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.transactionService.getAllProdects().subscribe((res: any) => {
      this.products = res;
    })
  }

  editProduct(product: Products) {

  }

  deleteProduct(productId: number) {

  }

}

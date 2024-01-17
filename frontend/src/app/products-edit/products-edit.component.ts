import { Component, OnInit } from '@angular/core';
import { Products } from '../products/products.model';
import { TransactionService } from '../products/transaction.service';
import { NavigationService } from '../service/navigation.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {
  product: any = {};
  constructor(
    private transactionService: TransactionService,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
  }

  addItem() {
    this.transactionService.addItem(this.product).subscribe((res) => {

    })
  }

  goBack() {
    this.navigationService.goBack('/');
  }

}

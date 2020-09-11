import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '../product-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:any;
  constructor(private productDataService:ProductDataService) { }

  ngOnInit() {
    this.products = this.productDataService.getAllProducts();
    console.log(this.products);
  }

}
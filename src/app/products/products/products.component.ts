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
    this.productDataService.getAllProducts().subscribe(data => {
      //console.log(data); 
      this.products = data;
      console.log(data);
      console.log("THIS"+this.products);

    })

  }

}

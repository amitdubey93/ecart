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
    /* this.productDataService.getAllProducts().subscribe(data => {
      //console.log(data); 
      this.products = data;
      console.log(data);
      console.log("THIS"+this.products);

    }) */
    this.products = [{
      "id":1,
      "name":"MEN'S BETTER THAN NAKED JACKET",
      "imgurl":"http://images.thenorthface.com/is/image/TheNorthFace/236x204_CLR/mens-better-than-naked-jacket-AVMH_LC9_hero.png"
     },
     {
      "id":2,
      "name":"MEN'S BETTER THAN NAKED JACKET",
      "imgurl":"http://images.thenorthface.com/is/image/TheNorthFace/236x204_CLR/womens-better-than-naked-jacket-AVKL_NN4_hero.png"
     },
     {
      "id":3,
      "name":"MEN'S BETTER THAN NAKED JACKET",
      "imgurl":"http://images.thenorthface.com/is/image/TheNorthFace/236x204_CLR/womens-single-track-shoe-ALQF_JM3_hero.png"
     },
     {
      "id":4,
      "name":"MEN'S BETTER THAN NAKED JACKET",
      "imgurl":"http://images.thenorthface.com/is/image/TheNorthFace/236x204_CLR/womens-single-track-shoe-ALQF_JM3_hero.png"
     }];

  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  products: Product[] = [];
  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {



    this.initalizeProductsByCategory();
  }
  initalizeProductsByCategory() {
    this.productService.getAllProductsByCategoryId().subscribe(res => {

      this.products = res;
      this.prelucrateImages();
      console.log("products:",  this.products);

    }, err => {
      console.log("Error while fetching data")
    });
  }
  prelucrateImages() {
    for(var i=0;i<this.products.length;i++){
      this.products[i].image = "assets/" + this.products[i].image;
      console.log(this.products[i]);
    } 
     
  }

  calculateImage(product : Product) : string {
    console.log('calculateImage');
    console.log("assets/" + product.image)
    return "assets/" + product.image;
  }

}

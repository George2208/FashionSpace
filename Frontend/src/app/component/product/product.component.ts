import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { AuthService } from 'src/app/service/auth.service';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  products: Product[] = [];
  categories: Category[] = [];

  constructor(private router: Router, private productService: ProductService,private categoryService: CategoryService, private authService: AuthService) { }

  ngOnInit(): void {
    this.initalizeProductsByCategory();
    this.initializeCategories();
  }

  initializeCategories() {
    this.categoryService.getAllCategories().subscribe(res => {

      this.categories = res;
      // console.log("categories:", this.categories)

    }, err => {
      console.log("Error while fetching data")
    });
  }

  initalizeProductsByCategory() {
    var category = this.categoryService.getCategoryFromLocalCache();
      if(category){
        this.productService.getAllProductsByCategoryName(category.name).subscribe(res => {
          this.products = res;
          this.prelucrateImages();
          console.log("productss:",  this.products);
    
        }, err => {
          console.log("Error while fetching data")
        });
    } else {
      this.productService.getAllProducts().subscribe(res => {
        this.products = res;
        this.prelucrateImages();
        console.log("products:",  this.products);
  
      }, err => {
        console.log("Error while fetching data")
      });
    }

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

  onLogout() : void{
    this.authService.logout();
    this.router.navigate(['/login']);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title:   'You have been successfully logged out',
      showConfirmButton: false,
      timer: 3000
    })
  }

  refreshProducts(category : Category) : void{
    this.categoryService.addCategoryToLocalCache(category);
    window.location.reload();
  }

  goToProductPage(product: Product) : void{
    this.productService.addProductToLocalCache(product);
    this.router.navigate(['/product-page']);
  }

}

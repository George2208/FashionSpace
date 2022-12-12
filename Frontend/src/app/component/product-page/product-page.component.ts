import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { AuthService } from 'src/app/service/auth.service';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {

  categories: Category[] = [];
  product : Product = new Product();
  constructor(private router: Router, private productService: ProductService, private authService: AuthService, private categoryService : CategoryService) {}

  ngOnInit(): void {
    this.initializeCategories();
    this.initializeProduct();
  }
  initializeProduct() {
    this.product = this.productService.getProductFromLocalCache();
    console.log(this.product);
  }

  initializeCategories() {
    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
    }, err => {
      console.log("Error while fetching data")
    });
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

  refreshProducts(category: Category) : void{
    this.categoryService.addCategoryToLocalCache(category);
    this.router.navigate(['/product']);
  }
}

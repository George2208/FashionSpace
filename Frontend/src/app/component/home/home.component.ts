import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { AuthService } from 'src/app/service/auth.service';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categories: Category[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private categoryService : CategoryService) {

   }
   ngOnInit(): void {
    this.initializeCategories();
  }

  initializeCategories() {
    this.categoryService.getAllCategories().subscribe(res => {

      this.categories = res;
      console.log("categories:", this.categories)

    }, err => {
      console.log("Error while fetching data")
    });
  }

}

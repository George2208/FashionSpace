import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { AuthService } from 'src/app/service/auth.service';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

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

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy{
  public showLoading: boolean | undefined;
  private subscriptions: Subscription[] = [];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  public onRegister(user: User): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.authService.register(user).subscribe(
        (response: any) => {
          this.showLoading = false;
          console.log('response', response);
    
          Swal.fire({
            position: 'center',
            icon: 'success',
            title:   'You have been successfully registered',
            showConfirmButton: false,
            timer: 3000
          })
  
        },
        (errorResponse: HttpErrorResponse) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title:   'Something went wrong. Try again!',
            showConfirmButton: true,
            // timer: 3000
          })
          this.showLoading = false;
        }
      )
    );

      this.showLoading = false;

      
    }

    ngOnDestroy(): void {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}

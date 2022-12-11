import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements  OnInit, OnDestroy {
  constructor(private router: Router, private authService: AuthService,) { }

  private subscriptions: Subscription[] = [];
  public showLoading: boolean | undefined;

  ngOnInit(): void {
    console.log('testt');
  
  }

  public onLogin(user: any): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.authService.login(user).subscribe(
        (response: HttpResponse<User>) => {
          // const token = response.headers.get(HeaderType.JWT_TOKEN) as any;
          // this.authenticationService.saveToken(token);
          console.log("login response",response);
          if(response.body)
            console.log("login response.body",response.body);
          if (response.body) // GUARD
            this.authService.addUserToLocalCache(response.body);
          this.router.navigateByUrl('/home');
          this.showLoading = false;
        },
        (errorResponse: HttpErrorResponse) => {
          // this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }

  ngOnDestroy(): void {
  }

  // testFunction(): void {
  //   this.authService.login().subscribe(res => {

  //     console.log('res', res);

  //   }, err => {
  //     console.log(err, "Error while fetching data")
  //   });

  // }

}

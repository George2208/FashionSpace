import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements  OnInit, OnDestroy {
  constructor(private router: Router, private loginService: LoginService,) { }

  
  public showLoading: boolean | undefined;

  ngOnInit(): void {
    console.log('testt');
    this.testFunction();
  }

  public onLogin(user: any): void {
    this.showLoading = true;
  }

  ngOnDestroy(): void {
  }

  testFunction(): void {
    this.loginService.getAllCategories().subscribe(res => {

      console.log('res', res);

    }, err => {
      console.log(err, "Error while fetching data")
    });

  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements  OnInit, OnDestroy {
  constructor() { }

  
  public showLoading: boolean | undefined;

  ngOnInit(): void {
    console.log('testt');
  }

  public onLogin(user: any): void {
    this.showLoading = true;
  }

  ngOnDestroy(): void {
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy{
  public showLoading: boolean | undefined;
  constructor() {}

  ngOnInit(): void {
  }

  public onRegister(user: any): void {
    this.showLoading = true;


      this.showLoading = false;
    }

    ngOnDestroy(): void {
    }

}

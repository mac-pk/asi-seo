import { Component, OnInit } from '@angular/core';
import { ISeoLogin } from '../shared/models/login/ILogin';
import { SeoService } from '../seo.service';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  loginSeo: ISeoLogin = {Asi: '68507', Username: 'na68507', Password: 'p@kistan123'};
  error = '';

  constructor(private seoService: SeoService, private router : Router) { }

  ngOnInit() {
  }

  loginAsiSeo(): void {
    this.error = '';
    this.seoService.loginSeo(this.loginSeo)
    .subscribe(
      data => {
          localStorage.setItem('userToken', data.AccessToken);
          this.router.navigate(['/searchSupplier']);
          //console.log(data);
      },
      error => {
        if (error && error.error && error.error.Message)
        {
          this.error = error.error.Message;
        }
        console.log(error);
      });  
  }
}
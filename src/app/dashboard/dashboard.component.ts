import { Component, OnInit } from '@angular/core';
import { SeoLogin } from '../seo';
import { SeoService } from '../seo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  loginSeo: SeoLogin = {Asi: '68507', Username: 'na68507', Password: 'p@kistan123'};

  constructor(private seoService: SeoService) { }

  ngOnInit() {
  }

  loginAsiSeo(): void {
    //console.log(this.loginSeo.Asi + ' ' + this.loginSeo.Username + ' ' + this.loginSeo.Password)
    this.seoService.loginSeo(this.loginSeo)
    .subscribe(login => console.log(login));
  }
}
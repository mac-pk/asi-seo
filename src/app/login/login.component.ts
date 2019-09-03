import { Component, OnInit } from '@angular/core';
import { ISeoLogin } from '../shared/models/login/ILogin';
import { SeoService } from '../seo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  loginSeo: ISeoLogin = {Asi: '', Username: '', Password: ''};
  //loginSeo: ISeoLogin = {Asi: '68507', Username: 'na68507', Password: 'p@kistan123'};
  error: string = '';
  isLoading: boolean = false;
  showHead: boolean = false;
  rememberPreference: boolean = false;

  constructor(private seoService: SeoService, private router : Router) { }

  ngOnInit() {
    if (localStorage.getItem('asiNumber') != null)
    {
      this.rememberPreference = true;
      this.loginSeo.Asi = localStorage.getItem('asiNumber');
      this.loginSeo.Username = localStorage.getItem('username');
    }
  }

  loginAsiSeo(): void {
    this.error = '';
    this.isLoading = true;
    this.seoService.loginSeo(this.loginSeo)
    .subscribe(
      data => {
        if (data.AccessToken)
        {
          const time_to_login = Date.now() + 86400000; //24 hours = 86400000 ms 
          
          if (this.rememberPreference)
          {
            localStorage.setItem('asiNumber', this.loginSeo.Asi);
            localStorage.setItem('username', this.loginSeo.Username);
          }
          else
          {
            localStorage.removeItem('asiNumber');
            localStorage.removeItem('username');
          }

          localStorage.setItem('userToken', data.AccessToken);
          localStorage.setItem('timer', JSON.stringify(time_to_login));
          this.isLoading = false;
          this.router.navigate(['/searchSupplier']);
        }
        else
        {
          if (data.error && data.error.ExceptionMessage)
          {
            this.error = data.error.ExceptionMessage;
          }    
          else if (data.error && data.error.error && data.error.error.Message)
          {
            this.error = data.error.error.Message;
          }  
          else
          {
            this.error = data.error.Message;
          }
        }

          //console.log(this.error);
          this.isLoading = false; 
      });   
  }
}
import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showHead: boolean = false;

  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if ((event['url'] == '/login') || (event['url'] == '/') ||
          ((event['url'] == '/searchSupplier') && (localStorage.getItem('userToken') == null))) {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }

  ngOnInit() {
    const timer = JSON.parse(localStorage.getItem('timer'));
    if (timer && (Date.now() > timer)) {
      this.logout();
    }
  }

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('supplier');
    this.router.navigate(['/login']);
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'

import { MyOrderByPipe } from './shared/sort/sort.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule }    from '@angular/common/http';
import { SearchSupplierComponent } from './search-supplier/search-supplier.component';
import { SearchProductComponent } from './search-product/search-product.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SearchSupplierComponent,
    SearchProductComponent,
    MyOrderByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [MyOrderByPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

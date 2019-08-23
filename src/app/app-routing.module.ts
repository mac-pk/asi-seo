import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import{SearchProductComponent} from './search-product/search-product.component';
import { SearchSupplierComponent }   from './search-supplier/search-supplier.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: DashboardComponent },
  { path: 'searchSupplier', component: SearchSupplierComponent, canActivate:[AuthGuard] },
  { path: 'searchProduct', component: SearchProductComponent, canActivate:[AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { SearchSupplierComponent } from './search-supplier/search-supplier.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'searchSupplier', component: SearchSupplierComponent, canActivate: [AuthGuard] },
  { path: 'searchProduct', component: SearchProductComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
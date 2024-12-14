import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'products/search/', component: ProductListComponent },
    { path: 'products', component: ProductListComponent }, 
    { path: 'products/category/:category', component: ProductListComponent },
    { path: 'product/:slug', component: ProductDetailsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cart', component: CartComponent },
    { path: '**', redirectTo: '' },
];

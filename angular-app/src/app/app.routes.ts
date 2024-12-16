import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageProductsComponent } from './components/admin/manage-products/manage-products.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { EditProductComponent } from './components/admin/edit-product/edit-product.component';
import { AdminGuard } from './guards/admin.guard';
import {ReviewsComponent } from './components/admin/manage-reviews/manage-reviews.component';
import { ManageOrdersComponent } from './components/admin/manage-orders/manage-orders.component';
import { OrderDetailsComponent } from './components/admin/order-details/order-details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'products/search/', component: ProductListComponent },
    { path: 'products', component: ProductListComponent }, 
    { path: 'products/category/:category', component: ProductListComponent },
    { path: 'product/:id', component: ProductDetailsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'orders', component: OrdersComponent }, 
    { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard], },
    { path: 'admin/products', component: ManageProductsComponent },
    { path: 'admin/add-product', component: AddProductComponent },
    { path: 'admin/edit-product/:id', component: EditProductComponent },
    { path: 'admin/manage-reviews', component: ReviewsComponent },
    { path: 'admin/manage-orders', component: ManageOrdersComponent },
    { path: 'admin/order-details/:id', component: OrderDetailsComponent },
    { path: '**', redirectTo: '' },

];

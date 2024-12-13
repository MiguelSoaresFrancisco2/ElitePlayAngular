import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
<<<<<<< Updated upstream
import { ProductDetailsComponent } from './components/product-details/product-details.component';
=======
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './home/home.component';

>>>>>>> Stashed changes

export const routes: Routes = [
    { path: '', component: HomeComponent },

<<<<<<< Updated upstream
    { path: '', component: ProductListComponent }, // Página inicial
    { path: 'product/:slug', component: ProductDetailsComponent },
=======
    { path: 'login', component: LoginComponent },
    
    { path: 'productlist', component: ProductListComponent }, // Página inicial
    
>>>>>>> Stashed changes
];

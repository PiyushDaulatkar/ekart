import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ProductComponent } from './components/product/product.component';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

export const routes: Routes = [
    {
        path: "", title: "login", component: WelcomeComponent
    },
    {
        path: "login", title: "login", component: LoginComponent
    },
    {
        path: "register", title: "register", component: RegisterUserComponent
    },
    {
        path: "products", title: "products", component: ProductComponent
    },
    {
        path: "cart", title: "cart", component: CartComponent
    },
    {
        path: "checkout", title: "checkout", component: CheckoutComponent
    },
    {
        path: "**", title: "pageNotFound", component: PageNotFoundComponent
    }
];

import { Routes } from '@angular/router';
import {AuthLayoutComponent} from "./core/auth-layout/auth-layout.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {MainLayoutComponent} from "./core/main-layout/main-layout.component";
import {OmittedComponent} from "./pages/omitted/omitted.component";

export const routes: Routes = [
  {path:'', component: AuthLayoutComponent,
  children: [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
  ]},
  {path: 'home', component: MainLayoutComponent,
    children: [
      {path: 'omitted', component: OmittedComponent}
    ]}
];

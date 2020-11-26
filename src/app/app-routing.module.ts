import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from 'src/app/pages/login/login.component';
import { TodoComponent } from 'src/app/pages/todo/todo.component';
import { LandingComponent } from 'src/app/pages/landing/landing.component';
import { SignupComponent } from './pages/signup/signup.component';


const routes: Routes = [{
  path: '',
  component: LandingComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'home',
  component: TodoComponent
}, {
  path: 'signup',
  component: SignupComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

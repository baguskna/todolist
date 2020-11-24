import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from 'src/app/pages/login/login.component';
import { TodoComponent } from 'src/app/pages/todo/todo.component';


const routes: Routes = [{
  redirectTo: 'home',
  path: '',
  pathMatch: 'full'
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'home',
  component: TodoComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

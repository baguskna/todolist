import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoComponent } from 'src/app/pages/todo/todo.component';
import { LandingComponent } from 'src/app/pages/landing/landing.component';
import { FormComponent } from './components/form/form.component';


const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'login',
    component: FormComponent
  },
  {
    path: 'home',
    component: TodoComponent
  },
  {
    path: 'signup',
    component: FormComponent
  },
  {
    path: 'todo',
    component: TodoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

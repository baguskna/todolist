import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoComponent } from 'src/app/pages/todo/todo.component';
import { LandingComponent } from 'src/app/pages/landing/landing.component';
import { FormComponent } from './components/form/form.component';
import { AuthGuard } from './service/auth.guard';
import { TodoGuard } from './service/todo.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: FormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: TodoComponent
  },
  {
    path: 'signup',
    component: FormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'todo',
    component: TodoComponent,
    // canActivate: [TodoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

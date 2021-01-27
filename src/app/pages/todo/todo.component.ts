import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Todo } from 'src/app/models/todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  todoForm = new FormGroup({
    todo: new FormControl('')
  });
  todos: Array<Todo> = [];

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(
      (todos: Array<Todo>) => {
        this.pushTodo(todos);
      }
    );

    this.subscription = this.todoService.todoChanges.subscribe(
      (todos: Array<Todo>) => {
        console.log(todos)
        this.pushTodo(todos);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    const todo = this.todoForm.value.todo;
    if (todo === "" || todo === null) {
      console.log('can\'t be empty ')
    } else {
      this.todoService.addTodo(todo)
      .subscribe(
        todo => {
          console.log(todo)
        },
        err => {
          console.log(err)
        }
      )
    }
    this.todoForm.reset();
  }

  private pushTodo(todos: Array<Todo>): Array<Todo> {
    return this.todos = todos;
  }
}

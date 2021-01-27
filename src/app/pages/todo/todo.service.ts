import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Todo } from 'src/app/models/todo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoChanges = new Subject<Array<Todo>>();
  todos: Array<Todo> = [];

  constructor(
    private http: HttpClient
  ) { }

  private handleError(
    err: HttpErrorResponse
  ): Observable<never> {
    return throwError(err.error.error.message);
  }

  addTodo(title: string): Observable<{ name: string }> {
    const dataBody = {
      title,
      isComplete: false
    };
    return this.http
    .post<{ name: string }>(
      environment.todoAPI,
      dataBody
    )
    .pipe(
      tap(res => {
        this.todos.push(dataBody),
        this.todoChanges.next(this.todos.slice());
      }),
      catchError(this.handleError)
    );
  }

  getTodos(): Observable<Array<Todo>> {
    return this.http
    .get<{ [key: string]: Todo }>(environment.todoAPI)
    .pipe(
      map(responseData => {
        const todos: Array<Todo> = new Array();
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            todos.push({ ...responseData[key], id: key });
          }
        }
        return todos;
      }),
      tap((todos: Array<Todo>) => {
        this.todos = todos;
        this.todoChanges.next(this.todos.slice());
      }),
      catchError(this.handleError)
    );
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { TodosService } from './todos.service';

export interface ITodo {
  id: number,
  title: string,
  isDone: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private todosSerice: TodosService) {

  }
  value = '';

  newTodoText = '';
  todos: ITodo[]= []

  ngOnInit() {
   this.getTodos(); 
  }

  getTodos() {
    this.todosSerice
    .recieveTodos()
    .subscribe((data: any) => {
      this.todos = data;
    });
  }

  toggleTodo(todo: ITodo) {
    this.todosSerice.changeCheckedTodo(todo)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.todos = this.todos.map((todoItem) => {
          if (todoItem.id === todo.id) {
            return {
              ...todoItem,
              isDone: todoItem.isDone
            }
          }
          return todoItem;
        })
        return throwError(() =>  error)
      })
    ).subscribe();
  }

  addTodo() {
    this.todosSerice.addTodo(this.newTodoText)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.todos.push({
          id: this.todos.length - 1,
          title: this.newTodoText,
          isDone: false,
        })
        return throwError(() =>  error)
      })
    )
    .subscribe((newTodo: any) => {
      this.todos.push(newTodo as ITodo)
      
    });
    this.newTodoText = '';
  }
}

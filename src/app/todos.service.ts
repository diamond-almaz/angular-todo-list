import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { ITodo } from "./app.component";

const BASE_URL = 'http://localhost:3000/todos'

@Injectable()
export class TodosService {

  constructor(private http: HttpClient) {

  }

  recieveTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(BASE_URL)
  }

  changeCheckedTodo(todo: ITodo) {
    todo.isDone = !todo.isDone;
    return this.http.put(`${BASE_URL}/${todo.id}`, todo);
  }

  addTodo(title: string) {
    return this.http.post(BASE_URL, {
      title,
      isDone: false,
    })
  }
}
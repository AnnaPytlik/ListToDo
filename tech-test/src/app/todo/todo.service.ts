import { Injectable } from '@angular/core';

let TODOS = [
  { id: 1, label: "Kitchen Cleanup",description:  "Clean my dirty kitchen", category: "house",done: false},
  {id: 2, label: "Taxes",description:  "Start doing my taxes and contact my accountant jhon for advice",category: "bureaucracy",done: '22-00-22'
  }
];

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  get(query = '') {
    return new Promise(resolve => {
      let data;

      if (query === 'completed' || query === 'active'){
        const isCompleted = query === 'completed';
        data = TODOS.filter(todo => todo.done === isCompleted);
      } else {
        data = TODOS;
      }

      resolve(data);
    });
  }

  add(data) {
    return new Promise(resolve => {
      TODOS.push(data);
      resolve(data);
    });
  }

  put(changed) {
    return new Promise(resolve => {
      const index = TODOS.findIndex(todo => todo === changed);
      TODOS[index].label = changed.label;
      resolve(changed);
    });
  }

  delete(selected) {
    return new Promise(resolve => {
      const index = TODOS.findIndex(todo => todo === selected);
      TODOS.splice(index, 1);
      resolve(true);
    });
  }

  deleteCompleted() {
    return new Promise(resolve => {
      TODOS = TODOS.filter(todo => !todo.done);
      resolve(TODOS);
    });
  }

  toggle(selected) {
    selected.done = !selected.done;
    return Promise.resolve();
  }

}
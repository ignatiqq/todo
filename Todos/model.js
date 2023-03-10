const switchMap = (innerObxReturningFunc) => (sourceObx) => {
    let innerSubscription
    return new rxjs.Observable(observer => {
      const sourceSubscription = sourceObx.subscribe({
        next(val) {
          // unsubscribe from previous subscription if exists
          innerSubscription && innerSubscription.unsubscribe()
  
          // subscribe to inner Observable
          const innerObx = innerObxReturningFunc(val);
          innerSubscription = innerObx._subscribe({    // <- start the inner Obx
            next: (_val) => observer.next(_val),
            error: (_err) => observer.error(_err),
            complete: () => observer.complete(),
          })
        },
        error() {
          // doesn’t care about source Obx errors
        },
        complete() {
          // doesn’t care about source Obx completion
        }
      })
      return () => {
        innerSubscription.unsubscribe()
        sourceSubscription.unsubscribe()
      }
    })
}

export class Todo {
    constructor({id, title, description, isCompleted = false}) {
        this.id = id;
        this.title = title;
        this.description = description || '';
        this.isCompleted = isCompleted;
    }

    change({title, description, isCompleted = false}) {
        this.title = title || this.title;
        this.description = description || this.description;
        this.isCompleted = isCompleted || this.isCompleted;
    }
}

export class TodosModel {
    id = 0;
    api = 'https://jsonplaceholder.typicode.com/todos?_limit=5'
    
    constructor(todos) {
        this.todos = [...todos] || [];

        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
    }

    adaptTodoData(todo) {
        return new Todo({id: todo.id, title: todo.title, isCompleted: todo.isCompleted});
    }

    getTodos() {
        const data$ = rxjs.fetch.fromFetch(this.api)
            .pipe(
                switchMap(res => new rxjs.Observable((observer) => res.json().then(observer.next))),
                rxjs.map((data) => data.map((item) => this.adaptTodoData(item))),
                rxjs.map((newTodos) => [...newTodos, ...this.todos])
            )
        return data$;
    }

    advance() {
        this.id = this.id + 1;
    }

    add({title, description, isCompleted = false}) {
        const newTodo = new Todo({title, description, isCompleted});
        this.todos.push(newTodo);
        this.advance();
        return newTodo;
    }

    delete(id) {
        this.todos.filter(item => item.id === id);
    }
}
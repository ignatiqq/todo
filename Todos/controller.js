export class TodoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.bindCbs();
    }

    init() {
        this.model.getTodos()
            .subscribe({
                next: (todos) => this.view.renderAll(todos),
                error: (err) => this.view.showTodosFetchError(err.message)
        })
    }

    bindCbs() {
        this.view.bindCallbacks({
            setCompleteTodoCallback: () => {}, 
            deleteTodoCallback: this.model.delete, 
            addTodoCallback: this.model.add
        })
    }

    handleAddTodo({title, descripton, isCompleted = false}) {
        const todo = this.model.add({title, descripton, isCompleted});
        this.view.addTodo(todo);
    }
    
}
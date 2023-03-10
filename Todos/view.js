export class TodoView {
    controlIds = {
        setComplete: '#set-complete',
        deleteBtn: '#delete-btn',
        todoAttr: 'todo-id'
    };
    deleteTodoCallback = null;
    setCompleteTodoCallback = null;
    addTodoCallback = null;

    constructor(selectors) {
        this.container = document.querySelector(selectors.container);
        this.todosContainer = document.querySelector(selectors.todosContainer);
    }

    bindSetCompleteCallback(cb) {
        this.setCompleteTodoCallback = cb;
    }

    bindDeleteTodoCallback(cb) {
        this.deleteTodoCallback = cb;
    }

    bindAddTodoCallback(cb) {
        this.addTodoCallback = cb;
    }
    
    bindCallbacks({setCompleteTodoCallback, deleteTodoCallback, addTodoCallback}) {
        this.bindDeleteTodoCallback(deleteTodoCallback);
        this.bindAddTodoCallback(addTodoCallback);
        this.bindSetCompleteCallback(setCompleteTodoCallback);
    }

    // bindListeners() {
    //     const containerClick$ = 
    //         rxjs.fromEvent(this.todoContainer, 'click')
    //             .pipe(
    //                 rxjs.map(this.chooseEvent)
    //             )
    // }

    chooseEvent(event) {
    }

    showTodosFetchError(message) {
        this.container.appendChild(this._createErrorMessage(message));
    }

    clearAll() {

    }

    _createErrorMessage(message) {
        const el = document.createElement('span');
        el.textContent = message;
        el.style.color = 'red';
        return el;
    }

    _createDeleteBtn(id) {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'delete';
        deleteBtn.id = this.controlIds.deleteBtn;
        rxjs.fromEvent(deleteBtn, 'click').subscribe(() => {
            this.deleteTodoCallback(id);
            this.destroyTodo(id);
        });
        return deleteBtn;
    }

    _createCompleteBtn(todo) {
        const completeBtn = document.createElement('checkbox');
        completeBtn.checked = todo.isCompleted;
        completeBtn.id = this.controlIds.setComplete;
        rxjs.fromEvent(completeBtn, 'click').subscribe((e) => {
            const flag = e.currentTarget.checked;
            completeBtn.checked = flag;
            this.setCompleteTodoCallback(todo.id, flag);
        });
        return completeBtn;
    }

    _createTitle(title) {
        const el = document.createElement('div');
        el.textContent = title;
        return el;
    }

    _createDescription(description) {
        const el = document.createElement('description');
        el.textContent = description;
        return el;
    }

    _createTodo(todo) {
        const container = document.createElement('div');
        container.setAttribute(this.controlIds.todoAttr, todo.id);

        const textContentWrapper = document.createElement('div');
        const controlsWrapper = document.createElement('div');


        textContentWrapper.appendChild(this._createTitle(todo.title));
        textContentWrapper.appendChild(this._createDescription(todo.description));
        controlsWrapper.appendChild(this._createDeleteBtn(todo.id));
        controlsWrapper.appendChild(this._createCompleteBtn(todo));
        container.appendChild(textContentWrapper);
        container.appendChild(controlsWrapper);

        this.todosContainer.appendChild(container);
    }

    destroyTodo(id) {
        const elToDelete = document.querySelector(`[${this.controlIds.todoAttr}="${id}"]`);
        this.todosContainer.removeChild(elToDelete);
    }

    renderAll(todos) {
        todos.forEach((todo) => this._createTodo(todo));
    }

    addTodo(todo) {
        const todoEl = this._createTodo(todo);
        this.todosContainer.appendChild(todoEl);
    }

    showTodos() {
        
    }

    onCreate() {
        // return rxjs.fromEvent()
    }

    getTitleHTML() {
        
    }
}
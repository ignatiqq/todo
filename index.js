import { TodoController } from "./Todos/controller.js";
import { Todo, TodosModel } from "./Todos/model.js";
import { TodoView } from "./Todos/view.js";

const todos = new TodoController(
    new TodosModel(
        [new Todo({id: 1, description: 'helloworld', title: 'ign'})]
    ), new TodoView(
        {container: '#app', todosContainer: '#todos-container'}
    )
);

todos.init();
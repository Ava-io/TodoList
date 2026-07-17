import Todo from "./todo.js";
import projectData, {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "./appState.js";

loadFromLocalStorage();

function renderProjects() {
  const projectListContainer = document.getElementById("project-list");
  projectListContainer.innerHTML = "";

  projectData.projects.forEach((project) => {
    const projectItem = document.createElement("div");
    projectItem.textContent = project.name;
    projectListContainer.appendChild(projectItem);
  });
}

function renderTodos() {
  const todoListContainer = document.getElementById("todo-list");
  todoListContainer.innerHTML = "";

  projectData.currentProject.todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.textContent = todo.title;
    todoListContainer.appendChild(todoItem);

    const todosItem = document.createElement("div");
    todosItem.textContent = todo.dueDate;
    todoListContainer.appendChild(todosItem);

    todoItem.addEventListener("click", (event) => {
      renderTodoDetail(todo);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    todoItem.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", (event) => {
      projectData.currentProject.removeTodo(todo);
      renderTodos();
    });
  });
}

function renderTodoDetail(todo) {
  const todoDetailContainer = document.getElementById("todo-detail");
  todoDetailContainer.innerHTML = "";

  const todoInput = document.createElement("input");
  todoInput.type = "text";
  todoInput.value = todo.title;
  todoDetailContainer.appendChild(todoInput);

  const todoDescription = document.createElement("input");
  todoDescription.type = "text";
  todoDescription.value = todo.description;
  todoDetailContainer.appendChild(todoDescription);

  const todoDueDate = document.createElement("input");
  todoDueDate.type = "date";
  todoDueDate.value = todo.dueDate;
  todoDetailContainer.appendChild(todoDueDate);

  const todoPriority = document.createElement("input");
  todoPriority.type = "input";
  todoPriority.value = todo.priority;
  todoDetailContainer.appendChild(todoPriority);

  const todoNotes = document.createElement("input");
  todoNotes.type = "input";
  todoNotes.value = todo.notes;
  todoDetailContainer.appendChild(todoNotes);

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  todoDetailContainer.appendChild(saveBtn);

  saveBtn.addEventListener("click", () => {
    todo.title = todoInput.value;
    todo.description = todoDescription.value;
    todo.dueDate = todoDueDate.value;
    todo.priority = todoPriority.value;
    todo.notes = todoNotes.value;
    renderTodos();
    renderTodoDetail();
  });
}

const todoForm = document.getElementById("todo-form");

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const titleValue = document.getElementById("title-input").value;
  const desValue = document.getElementById("description-input").value;
  const dateValue = document.getElementById("dueDate-input").value;
  const priorityValue = document.getElementById("priority-input").value;

  const newTodo = new Todo({
    title: titleValue,
    description: desValue,
    dueDate: dateValue,
    priority: priorityValue,
  });

  projectData.addTodoToCurrentProject(newTodo);
  renderTodos();
  saveToLocalStorage();
  todoForm.reset();
});

renderProjects();
renderTodos();

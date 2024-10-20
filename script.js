const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let todos = new Set(JSON.parse(localStorage.getItem("todos")) || []);

function displayTodos() {
    todoList.innerHTML = "";
    todos.forEach(todo => {
        const li = document.createElement("li");
        li.textContent = todo;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => deleteTodo(todo);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

function addTodo(e) {
    e.preventDefault();
    const newTodo = todoInput.value.trim();
    if (newTodo && !todos.has(newTodo)) {
        todos.add(newTodo);
        saveTodos();
        displayTodos();
    }
    todoInput.value = "";
}

function deleteTodo(todo) {
    todos.delete(todo);
    saveTodos();
    displayTodos();
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify([...todos]));
}

todoForm.addEventListener("submit", addTodo);

displayTodos();
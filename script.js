const form = document.getElementById("form");
const input = document.getElementById("input");
const todoList = document.getElementById("todoList");

const arrayTodo = JSON.parse(localStorage.getItem("arrayTodo"));

if (arrayTodo) {
  arrayTodo.forEach((todo) => {
    addTodoElements(todo);
  });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodoElements();
});

function addTodoElements(todo) {
  let todoValue = input.value;

  if (todo) {
    todoValue = todo.text;
  }

  if (todoValue) {
    const todoElement = document.createElement("li");

    if (todo && todo.completed) {
      todoElement.classList.add("completed");
    }

    todoElement.innerText = todoValue;

    todoElement.addEventListener("click", () => {
      todoElement.classList.toggle("completed");

      updateLocalStorage();
    });

    todoElement.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      todoElement.remove();

      updateLocalStorage();
    });

    todoList.appendChild(todoElement);

    input.value = "";

    updateLocalStorage();
  }
}

function updateLocalStorage() {
  const todoElements = document.querySelectorAll("li");

  const arrayTodo = [];

  todoElements.forEach((todoElement) => {
    arrayTodo.push({
      text: todoElement.innerText,
      completed: todoElement.classList.contains("completed"),
    });
  });

  localStorage.setItem("arrayTodo", JSON.stringify(arrayTodo));
}

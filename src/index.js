// * SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");

// * EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getFromLocalStorage);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", btnClickInList);

// *  FUNCTIONS
function addTodo(e) {
	e.preventDefault();

	//*-> CREATE DIV FOR UL
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");

	//*-> CREATE LI
	const newTodo = document.createElement("li");
	if (todoInput.value === "") {
		return false;
	} else {
		newTodo.innerText = todoInput.value;
	}
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);
	// console.log(todoInput.value);
	// * add todo to the local storage
	saveToLocalStorage(todoInput.value);

	//*-> CHECKED BUTTON
	const checkBtn = document.createElement("button");
	checkBtn.innerHTML = `<i class="fa fa-check-square" aria-hidden="true"></i>`;
	checkBtn.classList.add("check-btn");
	todoDiv.appendChild(checkBtn);

	//*-> EDIT BUTTON
	const editBtn = document.createElement("button");
	editBtn.innerHTML = `<i class="fa fa-pencil-square" aria-hidden="true"></i>`;
	editBtn.classList.add("edit-btn");
	todoDiv.appendChild(editBtn);

	//*-> DELETE BUTTON
	const deleteBtn = document.createElement("button");
	deleteBtn.innerHTML = `<i class="fa fa-minus-square" aria-hidden="true"></i>`;
	deleteBtn.classList.add("delete-btn");
	todoDiv.appendChild(deleteBtn);

	todoList.appendChild(todoDiv);

	// * for clearing the input
	todoInput.value = "";
}

function btnClickInList(e) {
	const item = e.target;
	const todo = item.parentElement;

	if (item.classList[0] === "check-btn") {
		todo.firstChild.classList.toggle("checked");
	}
	if (item.classList[0] === "edit-btn") {
		editTodo(todo);
	}
	if (item.classList[0] === "delete-btn") {
		todo.classList.add("delete-transition");
		deleteFromLocal(todo);
		todo.addEventListener("transitionend", () => {
			todo.remove();
		});
	}
}

const localStorageCheck = () => {
	//* check if there are any todo task
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	return todos;
};

const saveToLocalStorage = (todo) => {
	let todos = localStorageCheck();

	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
};

function getFromLocalStorage() {
	let todos = localStorageCheck();

	todos.forEach((element) => {
		//*-> CREATE DIV FOR UL
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");

		//*-> CREATE LI
		const newTodo = document.createElement("li");
		newTodo.innerText = element;
		newTodo.classList.add("todo-item");
		todoDiv.appendChild(newTodo);

		//*-> CHECKED BUTTON
		const checkBtn = document.createElement("button");
		checkBtn.innerHTML = `<i class="fa fa-check-square" aria-hidden="true"></i>`;
		checkBtn.classList.add("check-btn");
		todoDiv.appendChild(checkBtn);

		//*-> EDIT BUTTON
		const editBtn = document.createElement("button");
		editBtn.innerHTML = `<i class="fa fa-pencil-square" aria-hidden="true"></i>`;
		editBtn.classList.add("edit-btn");
		todoDiv.appendChild(editBtn);

		//*-> DELETE BUTTON
		const deleteBtn = document.createElement("button");
		deleteBtn.innerHTML = `<i class="fa fa-minus-square" aria-hidden="true"></i>`;
		deleteBtn.classList.add("delete-btn");
		todoDiv.appendChild(deleteBtn);

		todoList.appendChild(todoDiv);
	});
}

const deleteFromLocal = (todo) => {
	let todos = localStorageCheck();

	todoIndex = todo.childNodes[0].innerText;
	// console.log(todoIndex);

	todos.splice(todos.indexOf(todoIndex), 1);

	localStorage.setItem("todos", JSON.stringify(todos));
};

const editTodo = (todo) => {
	let todos = localStorageCheck();

	todoLocalText = todo.childNodes[0].innerText;

	let editValue = prompt("Edit your Task");
	todo.firstChild.innerText = editValue;

	let todoIndex = todos.indexOf(todoLocalText);

	todos.splice(todoIndex, 1, editValue);

	localStorage.setItem("todos", JSON.stringify(todos));
};

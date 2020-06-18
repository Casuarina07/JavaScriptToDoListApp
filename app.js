//SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
//can either be clicking on the delete button or the complete button
todoList.addEventListener('click', deleteAndComplete);
filterOption.addEventListener('click', filterTodo);

//FUNCTIONS 

function addTodo(event){
    //to prevent the page from refreshing - prevent form from 
    event.preventDefault();

    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Add Todo to Local storage
    saveLocalTodos(todoInput.value);

    //Create Completed BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create Delete BUTTON
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    //Clear Todoinput value
    todoInput.value = "";
}


function deleteAndComplete(e) {
    
    //whether it is the delete or complete button
    const item = e.target;
    //DELETE TODO 
    if(item.classList[0] === 'delete-btn') {
        console.log("Delete button is clicked");
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        deleteLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }

    //COMPLETE TODO
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}


function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        if(todo.classList!== undefined) {
            switch(e.target.value){
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if(todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    }else{
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if(!todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    }else{
                        todo.style.display = "none";
                    }
                    break;
            }
        }
    });
    
}


//SAVE TO LOCAL STORAGE
function saveLocalTodos(todo) {
    //CHECK whether do i have any todos already?
    let todos; 
    if(localStorage.getItem('todos') === null ) {
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//RETRIEVING FROM LOCAL STORAGE AND DISPLAYING ON THE UI
function getTodos() {
  //CHECK whether do i have any todos already?
  let todos; 
  if(localStorage.getItem('todos') === null ) {
      todos = [];
  }
  else{
      todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo) {
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Create Completed BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create Delete BUTTON
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

//Delete on LOCAL STORAGE
function deleteLocalTodos(todo) {

    let todos; 
  if(localStorage.getItem('todos') === null ) {
      todos = [];
  }
  else{
      todos = JSON.parse(localStorage.getItem('todos'));
  }

  const todoItem = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoItem), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
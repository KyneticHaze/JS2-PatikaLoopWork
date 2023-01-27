const form = document.getElementById("todo-form");
const input = document.querySelector(".form-control");
const addBtn = document.querySelector("#btn");
const firstBody = document.querySelector("#first-body");
const secondBody = document.querySelector("#second-body");
const todoList = document.querySelector("#list");


eventListeners(); // tüm eventleri çalıştıran ana fonksiyon

function eventListeners(){
    form.addEventListener('submit',addTodo); // Todo ekleme
    secondBody.addEventListener('click',deleteTodo); //Event Delegation
    document.addEventListener("DOMContentLoaded",loadAllFromUI); // Sayfa yenilense de todolar ui'da kalıyor
}


function loadAllFromUI(){
    let todos = getTodoFromStorage();

    todos.forEach(function(todo){
        addTodoFromUI(todo);
    })
}

function showAlert(message,type){

    const div = document.createElement("div");
    div.className = `alert alert-${type}`
    div.setAttribute("style","position: absolute; right: 6rem;");
    div.innerHTML = `<strong>${message}</strong>`;
    firstBody.appendChild(div);

    setTimeout(function(){
        div.remove();
    },1500);
}

function addTodo(e){

    let newTodo = input.value.trim();

    if(newTodo === ""){
        showAlert("Bir todo giriniz...","danger");
    }
    else {
        addTodoFromUI(newTodo);
        showAlert("Todo Eklendi","success");
        addTodoFromStorage(newTodo);
    }

    e.preventDefault();
}

function addTodoFromUI(newTodo){
    // List oluşturma
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center"
    // link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = `<i class="bi bi-x-lg"></i>`
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link)

    todoList.appendChild(listItem);

    input.value = "";
}


function addTodoFromStorage(todo){

    let todos = getTodoFromStorage();

    todos.push(todo);

    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodoFromStorage(){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}


function deleteTodo(e){

    if(e.target.className === "bi bi-x-lg"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("Todo başarıyla silindi...","success")
    }
}

function deleteTodoFromStorage(deleteTodo) {
    
    let todos = getTodoFromStorage();

    todos.forEach(function (todo,index){
        if(todo === deleteTodo) {
            todos.splice(index,1);
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}
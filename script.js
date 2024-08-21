const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");


let editTodo = null;

//Function to add to do
const addTodo = () => {
    const inputText = inputBox.value.trim()
    if(inputText.length <=0){
        alert("You must write something in your TO DO");
        return false;  // if dont write return false thrn it will add empty list
    }

    if(addBtn.value==="Edit"){
        editTodo.target.previousElementSibling.innerHTML = inputText;
        editLocalTodos(inputText);
        addBtn.value = "Add";
        inputBox.value = "";
    }
    else{

    //creating p tag
    const li= document.createElement("li");
    const p= document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);
    todoList.appendChild(li); 
    inputBox.value = "";

    //creating Edit Btn
    const editBtn = document.createElement("button")
    editBtn.innerHTML = "Edit"
    editBtn.classList.add("btn" , "editBtn")
    li.appendChild(editBtn)

    //cretaing Delete Btn
    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "Remove"
    deleteBtn.classList.add("btn", "deleteBtn")
    li.appendChild(deleteBtn)
    todoList.appendChild(li); 
    inputBox.value = "";

    
    saveLocalTodos(inputText);
    }
}

//function to update to do (Edit/delete)
const updateTodo = (e) => {
    if(e.target.innerHTML === "Remove"){
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement)
    }

    if(e.target.innerHTML === "Edit"){
        inputBox.value = e.target.previousElementSibling.innerHTML; // it will take whole p tag in input box
        inputBox.focus()
        addBtn.value = "Edit"
        editTodo = e;
    }
}

// function to save local todo
const saveLocalTodos = (todo) =>{
        let todos; 
        if(localStorage.getItem("todos")=== null){
        todos = [];
    }
    else{
        todos= JSON.parse(localStorage.getItem("todos"))  // parse function converts the json string into json objects
    }
        todos.push(todo);
        // console.log(typeof(todos));
        
        localStorage.setItem("todos", JSON.stringify(todos));  // localstorage always stores object so JSON.Stringify stores it in string
    // console.log(todos);
}

//function to get local todo
const getlLocalTodos = (todo) => {
    let todos; 
    if(localStorage.getItem("todos")=== null){
    todos = [];
}
    else{
    todos= JSON.parse(localStorage.getItem("todos"))
    todos.forEach(todo => {
            
            //creating p tag
            const li= document.createElement("li");
            const p= document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);
            

            //creating Edit Btn
            const editBtn = document.createElement("button")
            editBtn.innerHTML = "Edit"
            editBtn.classList.add("btn" , "editBtn")
            li.appendChild(editBtn)

            //cretaing Delete Btn
            const deleteBtn = document.createElement("button")
            deleteBtn.innerText = "Remove"
            deleteBtn.classList.add("btn", "deleteBtn")
            li.appendChild(deleteBtn)
            todoList.appendChild(li); 
            });
        }
    }

//function for delete local todos
const deleteLocalTodos = (todo) => {
    let todos; 
    if(localStorage.getItem("todos")=== null){
    todos = [];
}
else{
    todos= JSON.parse(localStorage.getItem("todos"))
}

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText)
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos) )
   

}

const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"))
    let todoIndex = todos.indexOf(todo)
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todo));
}

document.addEventListener("DOMContentLoaded", getlLocalTodos)
addBtn.addEventListener("click", addTodo)
todoList.addEventListener("click", updateTodo)
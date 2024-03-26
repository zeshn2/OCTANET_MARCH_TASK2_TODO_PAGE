document.addEventListener("DOMContentLoaded", function() {
 loadTasks();
});

function addTask() {
 var taskInput = document.getElementById("taskInput");
 var taskList = document.getElementById("taskList");

 if (taskInput.value.trim() === "") {
     alert("Please enter a task.");
     return;
 }

 var task = {
     id: Date.now(),
     content: taskInput.value.trim(),
     completed: false
 };

 appendTask(task);

 saveTask(task);

 taskInput.value = "";
}

function appendTask(task) {
 var taskList = document.getElementById("taskList");
 var li = document.createElement("li");
 li.textContent = task.content;
 li.setAttribute("data-id", task.id);

 if (task.completed) {
     li.classList.add("completed");
 }

 li.addEventListener("click", function() {
     toggleTaskCompletion(li);
 });

 var deleteButton = document.createElement("button");
 deleteButton.textContent = "Delete";
 deleteButton.onclick = function(event) {
     event.stopPropagation();
     deleteTask(task.id);
     li.remove();
 };

 li.appendChild(deleteButton);
 taskList.appendChild(li);
}

function toggleTaskCompletion(li) {
 li.classList.toggle("completed");

 var taskId = li.getAttribute("data-id");
 var tasks = JSON.parse(localStorage.getItem("tasks"));
 var taskIndex = tasks.findIndex(task => task.id == taskId);

 tasks[taskIndex].completed = !tasks[taskIndex].completed;
 localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveTask(task) {
 var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
 tasks.push(task);
 localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(id) {
 var tasks = JSON.parse(localStorage.getItem("tasks"));
 var updatedTasks = tasks.filter(task => task.id != id);
 localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

function loadTasks() {
 var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
 tasks.forEach(task => appendTask(task));
}

function clearTasks() {
 var taskList = document.getElementById("taskList");
 var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
 var completedTasks = tasks.filter(task => task.completed);

 completedTasks.forEach(task => {
     document.querySelector(`li[data-id="${task.id}"]`).remove();
     deleteTask(task.id);
 });
}

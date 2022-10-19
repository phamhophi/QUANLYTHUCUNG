"use strict";

// Selecting element
const btnAdd = document.querySelector("#btn-add");
const taskInput = document.querySelector("#input-task");
const listTodo = document.querySelector("#todo-list");

// Get logged in user
const currentUser = getFromStorage("currentUser") || "";

// Get data from LocalStorage
const KEY = "TASK_ARRAY";
const todoArr = JSON.parse(getFromStorage(KEY)) || [];

// Add button event
btnAdd.addEventListener("click", function () {
  // Convert from JS Object to Class Instance
  const taskData = new Task(taskInput.value, currentUser, false);

  // Save task to LocalStorage
  if (taskData.task) {
    todoArr.push(taskData);
    saveToStorage(KEY, JSON.stringify(todoArr));
    renderData(todoArr);
    taskInput.value = "";
  }
});

// Display task data in HTML
const renderData = (data) => {
  listTodo.innerHTML = "";

  data.forEach((d, index) => {
    const li = document.createElement("li");
    // Check task of logged in user
    if (d.owner === currentUser) {
      if (d.isDone) {
        li.classList.add("checked");
      }
      li.innerHTML = `<div onclick="completeTask('${d.task}')">${d.task}<span class="close" onclick="deleteTask('${d.task}', event)">×</span></div>`;
      listTodo.appendChild(li);
    }
  });
};
// Delete button event
const deleteTask = (task, e) => {
  e.stopPropagation();
  // Search task to delete from todoArr
  const pIndex = todoArr.findIndex(
    (todo) => task === todo.task && todo.owner === currentUser
  );

  // Delete task and save to LocalStorage
  todoArr.splice(pIndex, 1);
  saveToStorage(KEY, JSON.stringify(todoArr));
  renderData(todoArr);
};

//  task data from LocalStorage
if (todoArr) {
  todoArr.forEach((task) => {
    if (task.owner === currentUser) {
      renderData(todoArr);
    }
  });
}

// Event click task
const completeTask = (task) => {
  //Search index task click from todoArr
  const pIndex = todoArr.findIndex(
    (todo) => task === todo.task && todo.owner === currentUser
  );

  // Completed/not completed task
  if (todoArr[pIndex].isDone) {
    todoArr[pIndex].isDone = false;
  } else {
    todoArr[pIndex].isDone = true;
  }

  // Reload task and save to LocalStorage
  renderData(todoArr);
  saveToStorage(KEY, JSON.stringify(todoArr));
};

// Select elements
const taskInput = document.querySelector("#taskInput");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");
const taskCounter = document.querySelector("#taskCounter");
const filterButtons = document.querySelectorAll(".filter-btn");


// Application data
let tasks = [];

let currentFilter = "all";


// Add task
function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    renderTasks();
}


// Render tasks
function renderTasks() {

    taskList.textContent = "";


    // Filter tasks
    let visibleTasks = tasks;

    if (currentFilter === "active") {

        visibleTasks = tasks.filter(function (task) {
            return !task.completed;
        });

    }

    if (currentFilter === "completed") {

        visibleTasks = tasks.filter(function (task) {
            return task.completed;
        });

    }


    // Create task elements
    visibleTasks.forEach(function (task) {

        const originalIndex = tasks.indexOf(task);


        // li
        const li = document.createElement("li");

        li.classList.add("task-item");


        // Checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;


        // Task text
        const taskText = document.createElement("span");

        taskText.textContent = task.text;

        taskText.classList.add("task-text");


        // Completed style
        if (task.completed) {
            taskText.classList.add("completed");
        }


        // Task content
        const taskContent = document.createElement("div");

        taskContent.classList.add("task-content");

        taskContent.appendChild(checkbox);

        taskContent.appendChild(taskText);


        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.classList.add("delete-btn");


        // Add elements
        li.appendChild(taskContent);

        li.appendChild(deleteButton);

        taskList.appendChild(li);


        // Checkbox event
        checkbox.addEventListener("change", function () {

            task.completed = checkbox.checked;

            renderTasks();

        });


        // Delete event
        deleteButton.addEventListener("click", function () {

            tasks.splice(originalIndex, 1);

            renderTasks();

        });

    });


    updateCounter();
}


// Update counter
function updateCounter() {

    const remainingTasks = tasks.filter(function (task) {

        return !task.completed;

    }).length;


    taskCounter.textContent =
        `${remainingTasks} tasks remaining`;
}


// Add button event
addButton.addEventListener("click", addTask);


// Enter key event
taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// Filter buttons
filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        currentFilter = button.dataset.filter;


        // Remove active from all buttons
        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        // Add active to selected button
        button.classList.add("active");


        renderTasks();

    });

});
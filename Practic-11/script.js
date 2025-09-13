let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.getElementById("taskForm").addEventListener("submit", function (e) {
    e.preventDefault();
    addTask();
});

document.getElementById("filterpriority").addEventListener("change", displayTasks);

function local() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let title = document.getElementById("title").value
    let description = document.getElementById("description").value
    let dueDate = document.getElementById("dueDate").value
    let priority = document.getElementById("priority").value

    if (!title || !dueDate) {
        alert("Title and due date both are required.");
        return;
    }

    let newTask = {
        id: Date.now(),
        title,
        description,
        dueDate,
        priority,
    };

    tasks.push(newTask);
    local();
    displayTasks();
    document.getElementById("taskForm").reset();
}

function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let filter = document.getElementById("filterpriority").value;
    let filtertask = filter === "all" ? tasks : tasks.filter(task => task.priority === filter);

    filtertask.map(task => {
        let li = document.createElement("li");
        li.className = `task ${task.priority}`;
        li.innerHTML = `
      <strong>${task.title}</strong> (${task.priority})<br/>
      ${task.description ? `<p>${task.description}</p>` : ""}
      <small>Due date: ${task.dueDate}</small> 
      <div class="m-2">
        <button onclick="editTask(${task.id})" class="btn btn-outline-secondary me-2 text-dark"><i class="ri-edit-line"></i>Edit</button>
        <button onclick="deleteTask(${task.id})" class="btn btn-outline-secondary text-dark"><i class="ri-delete-bin-6-line"></i>Delete</button>
      </div>
     
    `;
        list.appendChild(li);
    });
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    local();
    displayTasks();
}

function editTask(id) {


    let task = tasks.find(t => t.id === id);
    if (!task) return;

    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;
    document.getElementById("dueDate").value = task.dueDate;
    document.getElementById("priority").value = task.priority;

    deleteTask(id);
}
window.onload = displayTasks;

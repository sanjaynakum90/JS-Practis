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
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let dueDate = document.getElementById("dueDate").value;
    let priority = document.getElementById("priority").value;

    if (!title || !dueDate) {
        alert("Title and due date are required!");
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

function getPriorityClass(priority) {
    const classes = {
        low: "bg-green-100 border-green-200",
        medium: "bg-yellow-100 border-yellow-200",
        high: "bg-red-100 border-red-200"
    };
    return classes[priority] || "bg-gray-100";
}

function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let filter = document.getElementById("filterpriority").value;
    let filteredTasks = filter === "all" ? tasks : tasks.filter(task => task.priority === filter);

    filteredTasks.forEach(task => {
        let li = document.createElement("li");
        li.className = `${getPriorityClass(task.priority)} p-4 rounded-lg border-2 transition duration-200 hover:shadow-md`;
        li.innerHTML = `
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="font-bold text-lg">${task.title}</h3>
                            <span class="inline-block px-2 py-1 text-sm rounded-full ${getPriorityClass(task.priority)} mt-1">
                                ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </span>
                            ${task.description ? `<p class="text-gray-600 mt-2">${task.description}</p>` : ""}
                            <p class="text-sm text-gray-500 mt-2">Due: ${task.dueDate}</p>
                        </div>
                        <div class="space-x-2">
                            <button onclick="editTask(${task.id})" 
                                class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="deleteTask(${task.id})" 
                                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
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

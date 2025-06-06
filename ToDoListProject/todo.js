let tasks = [];

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    document.getElementById("formMsg").textContent = "Please fill all fields.";
    return;
  }

  document.getElementById("formMsg").textContent = "Form submitted!";

  document.getElementById("sumName").textContent = name;
  document.getElementById("sumEmail").textContent = email;
  document.getElementById("sumMessage").textContent = message;

  this.reset();
});

function addTask() {
  const input = document.getElementById("taskInput").value.trim();
  const status = document.getElementById("statusSelect").value;

  if (input === "") return;

  const taskObj = { name: input, status };
  tasks.push(taskObj);
  renderTasks();
  updateSummary();
  document.getElementById("taskInput").value = "";
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const statusClass = `status-${task.status.replace(" ", "\\ ")}`;
    li.innerHTML = `
      ${task.name}
      <span class="task-status ${statusClass}">${task.status}</span>
      <button onclick="deleteTask(${index})">❌</button>
    `;

    taskList.appendChild(li);
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
  updateSummary();
}

function updateSummary() {
  const completed = tasks.filter(t => t.status === "Completed").length;
  const pending = tasks.filter(t => t.status === "Pending").length;
  const inProgress = tasks.filter(t => t.status === "In Progress").length;

  document.getElementById("countCompleted").textContent = completed;
  document.getElementById("countPending").textContent = pending;
  document.getElementById("countInProgress").textContent = inProgress;
}

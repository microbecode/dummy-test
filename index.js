const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    savedTasks.forEach(task => addTaskToDOM(task.text, task.done));
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("li").forEach(li => {
    tasks.push({ text: li.innerText.replace("❌", "").trim(), done: li.classList.contains("done") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
    addTaskToDOM(taskText);
    taskInput.value = "";
    saveTasks();
    }
}

function addTaskToDOM(text, done = false) {
    const li = document.createElement("li");
    li.textContent = text;

    if (done) {
    li.classList.add("done");
    }

    li.addEventListener("click", () => {
    li.classList.toggle("done");
    saveTasks();
    });

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = " ❌";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// ABBBBBBBAABBBABAABAAABBBBBABABBBAABAABABAABABBAABABABBBAAABABAABBABBABBBAABAABBAABBBAABAAABBBBBABBAABABAAAABAAABBBBAAABAABBAAAAAAABABBAAAABBABAABBABAAAAAABBAABAAABAAABBBBAABBAABBABABBBABBBBAABBAAABABABBBABBAABABBBBAABAABAABBAAABBABBABBAABBBABBBAAAABAABAAAB

taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
    addTask();
    }
});

loadTasks();
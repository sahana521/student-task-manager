let tasks = [];

let xp = 0;


// ADD TASK

function addTask() {

    const input = document.getElementById("taskInput");

    const taskText = input.value.trim();

    if (taskText === "") {
        showMessage("⚠️ Enter a quest first!");
        return;
    }


    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };


    tasks.push(task);

    input.value = "";

    showMessage("✨ New Quest Added!");

    displayTasks();

}


// DISPLAY TASKS

function displayTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";


    tasks.forEach(function(task) {

        const taskDiv = document.createElement("div");

        taskDiv.className = "task";


        if (task.completed) {
            taskDiv.classList.add("completed");
        }


        taskDiv.innerHTML = `

            <div class="task-name">
                🎯 ${task.text}
            </div>

            <div class="task-buttons">

                <button
                    class="complete-btn"
                    onclick="completeTask(${task.id})">
                    ${task.completed ? "↩️" : "✅"}
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})">
                    🗑️
                </button>

            </div>

        `;


        taskList.appendChild(taskDiv);

    });


    updateProgress();

}


// COMPLETE TASK

function completeTask(id) {

    const task = tasks.find(function(task) {

        return task.id === id;

    });


    if (!task.completed) {

        task.completed = true;

        xp += 20;

        showMessage("🎉 QUEST COMPLETED! +20 XP");

    } else {

        task.completed = false;

        xp -= 20;

        showMessage("↩️ Quest reopened");

    }


    document.getElementById("xp").textContent = xp;

    displayTasks();

}


// DELETE TASK

function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });


    showMessage("🗑️ Quest removed");

    displayTasks();

}


// PROGRESS

function updateProgress() {

    const progressBar = document.getElementById("progress");

    const progressText = document.getElementById("progressText");


    if (tasks.length === 0) {

        progressBar.style.width = "0%";

        progressText.textContent = "0%";

        return;

    }


    const completedTasks = tasks.filter(function(task) {

        return task.completed;

    }).length;


    const percentage =
        Math.round((completedTasks / tasks.length) * 100);


    progressBar.style.width = percentage + "%";

    progressText.textContent = percentage + "%";


    if (percentage === 100) {

        showMessage("🏆 ALL QUESTS COMPLETED! YOU DID IT!");

    }

}


// MESSAGE

function showMessage(text) {

    const message = document.getElementById("message");

    message.textContent = text;


    setTimeout(function() {

        message.textContent = "";

    }, 2000);

}


// ENTER KEY

document
    .getElementById("taskInput")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            addTask();

        }

    });
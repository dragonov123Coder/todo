function createTask(taskName) {
    // Create the list element
    const newLi = document.createElement("li");

    // Create the complete button
    const taskComplete = document.createElement("button");
    taskComplete.className = "task";
    taskComplete.textContent = taskName; // Set the text of the task

    // Add the event that occurs when button is clicked
    taskComplete.addEventListener("click", () => {
        if (taskComplete.style.textDecoration === "line-through") {
            taskComplete.style.textDecoration = "none";
        } else {
            taskComplete.style.textDecoration = "line-through";
        };
    });

    // Create the delete button
    const taskDelete = document.createElement("button");
    taskDelete.className = "delete";
    taskDelete.textContent = "❌"; // Set the text of the delete button

    // Add the event that occures when delete button is clicked
    taskDelete.addEventListener("click", () => {
        // Remove from DOM
        newLi.remove();

        // Remove from tasks array
        const index = tasks.indexOf(taskName);
        if (index > -1) {
            tasks.splice(index, 1);
            updateLocalStorage();
        };
    });

    // Apeend the complete and delete buttons
    newLi.appendChild(taskComplete);
    newLi.appendChild(taskDelete);

    return newLi;
}

function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const stored = localStorage.getItem("tasks");
    if (stored) {
        try {
            tasks = JSON.parse(stored);
            tasks.forEach(taskName => {
                const taskElement = createTask(taskName);
                document.querySelector("ul").appendChild(taskElement);
            });
        } catch (e) {
            console.error("Error loading tasks:", e);
            tasks = [];
        }
    }
}

// Global Variables
const inputBox = document.querySelector("#itemInput");
const submitButton = document.querySelector("#submitButton");
let tasks = [];

// Load tasks when the page loads
loadTasks()

submitButton.addEventListener("click", () => {
    // Get the input value
    const taskText = inputBox.value.trim();
    if (taskText === "") return; // Don't add empty tasks

    // Add to array
    tasks.push(taskText);

    // Create DOM element
    const newTask = createTask(taskText);
    document.querySelector("ul").appendChild(newTask);

    // Save to localStorage
    updateLocalStorage();

    // Clear the input value
    inputBox.value = "";
});

inputBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        // Get the input value
        const taskText = inputBox.value.trim();
        if (taskText === "") return; // Don't add empty tasks

        // Add to array
        tasks.push(taskText);

        // Create DOM element
        const newTask = createTask(taskText);
        document.querySelector("ul").appendChild(newTask);

        // Save to localStorage
        updateLocalStorage();

        // Clear the input value
        inputBox.value = "";
    }
})
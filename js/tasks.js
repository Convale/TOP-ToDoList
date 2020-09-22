function displayTasks(projectNum) {
  document.querySelector("#mainOpenTaskContainer").innerHTML = "";
  const mainContent = document.querySelector("#mainOpenTaskContainer");

  insertTasks(projectNum, "open");

  if (projectNum != 0) {
    //Add a task Button
    const addNewTaskButtonDiv = document.createElement("div");
    addNewTaskButtonDiv.setAttribute("id", "addTask");
    mainContent.appendChild(addNewTaskButtonDiv);
    const addNewTaskButton = document.createElement("input");
    addNewTaskButton.setAttribute("type", "button");
    addNewTaskButton.setAttribute("id", "addTaskButton");
    addNewTaskButton.setAttribute("value", "+  Add Task");
    addNewTaskButton.className = "mainAddTask";
    addNewTaskButton.addEventListener("click", addTask);
    addNewTaskButtonDiv.appendChild(addNewTaskButton);

    //Add a task area
    const addTaskArea = document.createElement("div");
    addTaskArea.className = "mainContentTask hidden";
    addTaskArea.setAttribute("id", "addTaskInput");
    mainContent.appendChild(addTaskArea);

    const addElement1 = document.createElement("input");
    addElement1.setAttribute("type", "button");
    addElement1.setAttribute("value", "Cancel");
    addElement1.className = "addTask";
    addElement1.addEventListener("click", cancelAddTask);
    addTaskArea.appendChild(addElement1);

    const addElement2 = document.createElement("div");
    addElement2.className = "mainContentTaskText";
    const addElement21 = document.createElement("input");
    addElement21.setAttribute("type", "text");
    addElement21.setAttribute("id", "addEditTaskPriority");
    addElement2.appendChild(addElement21);
    addTaskArea.appendChild(addElement2);

    const addElement3 = document.createElement("div");
    addElement3.className = "mainContentTaskText";
    const addElement31 = document.createElement("input");
    addElement31.setAttribute("type", "text");
    addElement31.setAttribute("id", "addEditTaskTitle");
    addElement3.appendChild(addElement31);
    addTaskArea.appendChild(addElement3);

    const addElement4 = document.createElement("div");
    addElement4.className = "mainContentTaskText";
    const addElement41 = document.createElement("input");
    addElement41.setAttribute("type", "date");
    addElement41.setAttribute("id", "addEditTaskDate");
    addElement4.appendChild(addElement41);
    addTaskArea.appendChild(addElement4);

    const addElement5 = document.createElement("input");
    addElement5.setAttribute("type", "button");
    addElement5.setAttribute("value", "Add");
    addElement5.className = "addTask";
    addElement5.addEventListener("click", addNewTask);
    addTaskArea.appendChild(addElement5);

    const addElement6 = document.createElement("input");
    addElement6.setAttribute("type", "hidden");
    addElement6.setAttribute("id", "projectNum");
    addElement6.setAttribute("value", projectNum);
    addTaskArea.appendChild(addElement6);
  }

  const addBlankLine = document.createElement("br");
  mainContent.appendChild(addBlankLine);
  const addBlankLine2 = document.createElement("br");
  mainContent.appendChild(addBlankLine2);

  const completedTasks = document.createElement("div");
  completedTasks.className = "completedTasks";
  completedTasks.textContent = "Completed Tasks";
  mainContent.appendChild(completedTasks);

  insertTasks(projectNum, "completed");
}

function insertTasks(projectNum, status) {
  const mainContent = document.querySelector("#mainOpenTaskContainer");
  const projectsLS = JSON.parse(localStorage.getItem("projects"));

  for (
    let i = 0,
      n =
        status == "open"
          ? projectsLS[projectNum].openTasks.length
          : projectsLS[projectNum].completedTasks.length;
    i < n;
    i++
  ) {
    const currentTask =
      status == "open"
        ? projectsLS[projectNum].openTasks[i]
        : projectsLS[projectNum].completedTasks[i];
    const addMainContentTask = document.createElement("div");
    addMainContentTask.className = "mainContentTask";
    mainContent.appendChild(addMainContentTask);
    const addElement1 = document.createElement("label");
    addElement1.className = "completedTask";
    const addElement11 = document.createElement("input");
    addElement11.setAttribute("type", "checkbox");
    status == "completed"
      ? (addElement11.checked = true)
      : (addElement11.checked = false);
    addElement11.className = "completedTask";
    addElement11.addEventListener("click", () => {
      changeTaskStatus(i, projectNum, status);
    });
    addElement1.appendChild(addElement11);
    const addElement12 = document.createElement("span");
    addElement12.className = "slider round";
    addElement1.appendChild(addElement12);
    addElement1.setAttribute("id", i);
    addMainContentTask.appendChild(addElement1);

    const addElement2 = document.createElement("div");
    addElement2.className = "mainContentTaskText";
    addElement2.textContent = currentTask.priority;
    addMainContentTask.appendChild(addElement2);

    const addElement3 = document.createElement("div");
    addElement3.className = "mainContentTaskText";
    addElement3.textContent = currentTask.title;
    addMainContentTask.appendChild(addElement3);

    const addElement4 = document.createElement("div");
    addElement4.className = "mainContentTaskText";
    addElement4.textContent = formatDate(currentTask.dueDate);
    addMainContentTask.appendChild(addElement4);

    const addElement5 = document.createElement("input");
    addElement5.setAttribute("type", "button");
    addElement5.setAttribute("value", "O O O");
    addElement5.className = "editTask";
    addElement5.addEventListener("click", () => {
      openTaskEdit(i, projectNum, status);
    });
    addMainContentTask.appendChild(addElement5);
  }
}

function openTaskEdit(taskNum, projectNum, taskStatus) {
  const projectsLS = JSON.parse(localStorage.getItem("projects"));
  const currentTask =
    taskStatus == "open"
      ? projectsLS[projectNum].openTasks[taskNum]
      : projectsLS[projectNum].completedTasks[taskNum];
  document.querySelector("#editTaskTitle").value = currentTask.title;
  document.querySelector("#editTaskDueDate").value = formatDateForEdit(
    currentTask.dueDate
  );
  document.querySelector("#editTaskPriority").value = currentTask.priority;
  document.querySelector("#editTaskDuration").value = currentTask.duration;
  document.querySelector("#editTaskProject").selected =
    projectsLS[projectNum].title;
  document.querySelector("#editTaskNotes").value = currentTask.notes;
  document.querySelector("#editTaskProject").value = projectNum;
  document.querySelector("#editTaskProjectOrig").value = projectNum;
  document.querySelector("#editTaskNum").value = taskNum;
  document.querySelector("#editTaskStatus").value = currentTask.status;

  document.querySelector("#editTaskLayer").style.display = "block";
}

function addNewTask() {
  const formTitle = document.querySelector("#addEditTaskTitle").value;
  const dueDate = document.querySelector("#addEditTaskDate").value;
  const formDate = new Date(
    dueDate.substring(0, 4),
    dueDate.substring(5, 7) - 1,
    dueDate.substring(8, 10)
  );
  const formPriority = document.querySelector("#addEditTaskPriority").value;
  const formDuration = null;
  const projectNum = document.querySelector("#projectNum").value;
  const formNotes = "";
  const taskStatus = "open";

  if (formPriority != "" && formTitle != "" && formDate != "") {
    const projectsLS = JSON.parse(localStorage.getItem("projects"));
    var intsertTask = new Task(
      formTitle,
      formDate,
      formPriority,
      formDuration,
      formNotes,
      taskStatus
    );
    projectsLS[projectNum].openTasks.push(intsertTask);
    localStorage.projects = JSON.stringify(projectsLS);
    displayProjects(projectNum);
    displayTasks(projectNum);
  }
}

function changeTaskStatus(taskNum, projectNum, status) {
  const projectsLS = JSON.parse(localStorage.getItem("projects"));

  if (status == "open") {
    projectsLS[projectNum].completedTasks.push(
      projectsLS[projectNum].openTasks[taskNum]
    );
    projectsLS[projectNum].openTasks[taskNum].status = "completed";
    projectsLS[projectNum].openTasks.splice(taskNum, 1);
    localStorage.projects = JSON.stringify(projectsLS);
  } else if (status == "completed") {
    projectsLS[projectNum].openTasks.push(
      projectsLS[projectNum].completedTasks[taskNum]
    );
    projectsLS[projectNum].completedTasks[taskNum].status = "open";
    projectsLS[projectNum].completedTasks.splice(taskNum, 1);
    localStorage.projects = JSON.stringify(projectsLS);
  }
  displayProjects(projectNum);
  setTimeout(displayTasks, 400, projectNum);
}

function addTask() {
  document.querySelector("#addTaskInput").style.display = "grid";
  document.querySelector("#addTask").style.display = "none";
}

function cancelAddTask() {
  document.querySelector("#addTaskInput").style.display = "none";
  document.querySelector("#addTask").style.display = "grid";
}

editTaskCancel.addEventListener("click", () => {
  document.querySelector("#editTaskLayer").style.display = "none";
});

editTaskSubmit.addEventListener("click", () => {
  const projectsLS = JSON.parse(localStorage.getItem("projects"));
  const taskNum = document.querySelector("#editTaskNum").value;
  const projectNum = document.querySelector("#editTaskProject").value;
  const projectNumOrig = document.querySelector("#editTaskProjectOrig").value;
  const currentTask = projectsLS[projectNumOrig].openTasks[taskNum];
  const title = document.querySelector("#editTaskTitle").value;
  const dueDate = document.querySelector("#editTaskDueDate").value;
  const dueDateInsert = new Date(
    dueDate.substring(0, 4),
    dueDate.substring(5, 7) - 1,
    dueDate.substring(8, 10)
  );
  const priority = document.querySelector("#editTaskPriority").value;

  if (title != "" && dueDate != "" && priority != "") {
    currentTask.title = title;
    currentTask.dueDate = dueDateInsert;
    currentTask.priority = priority;
    currentTask.duration = document.querySelector("#editTaskDuration").value;
    currentTask.notes = document.querySelector("#editTaskNotes").value;
    updateTaskStorage(projectNumOrig, taskNum, "openTasks", currentTask);

    if (projectNum != projectNumOrig) {
      projectsLS[projectNum].openTasks.push(
        projectsLS[projectNumOrig].openTasks[taskNum]
      );
      projectsLS[projectNumOrig].openTasks.splice(taskNum, 1);
      localStorage.projects = JSON.stringify(projectsLS);
      displayProjects(projectNum);
    }

    displayTasks(projectNum);
    document.querySelector("#editTaskLayer").style.display = "none";
  }
});

editTaskDelete.addEventListener("click", (details) => {
  const projectsLS = JSON.parse(localStorage.getItem("projects"));
  const taskStatus = document.querySelector("#editTaskStatus").value;
  const taskNum = document.querySelector("#editTaskNum").value;
  const projectNum = document.querySelector("#editTaskProject").value;

  if (taskStatus == "open") {
    projectsLS[projectNum].hiddenTasks.push(
      projectsLS[projectNum].openTasks[taskNum]
    );
    projectsLS[projectNum].openTasks[taskNum].status = "hidden";
    projectsLS[projectNum].openTasks.splice(taskNum, 1);
    localStorage.projects = JSON.stringify(projectsLS);
  } else if (taskStatus == "completed") {
    projectsLS[projectNum].hiddenTasks.push(
      projectsLS[projectNum].completedTasks[taskNum]
    );
    projectsLS[projectNum].completedTasks[taskNum].status = "hidden";
    projectsLS[projectNum].completedTasks.splice(taskNum, 1);
    localStorage.projects = JSON.stringify(projectsLS);
  }

  displayProjects(projectNum);
  displayTasks(projectNum);
  document.querySelector("#editTaskLayer").style.display = "none";
});

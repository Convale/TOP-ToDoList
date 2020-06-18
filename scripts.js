class Task { 
    constructor(title, dueDate, priority, duration, project, notes, status) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.duration = duration;
        this.project = project;
        this.notes = notes;
        this.status = status;
    }
}

class Project { 
    constructor(title, status, openTasks, completedTasks, hiddenTasks) {
        this.title = title;
        this.status = status;
        this.openTasks = openTasks;
        this.completedTasks = completedTasks;
        this.hiddenTasks = hiddenTasks;
    }
}

//Test Tasks
var taskNum1 = new Task("Workout", new Date(2020, 11, 31), 1, 120, project1, "Doing great with your routine, keep it up!", "open");
var taskNum2 = new Task("Meditate", new Date(2020, 11, 20), 2, 120, project1, "Keep meditating!", "open");
var taskNum3 = new Task("Work on Project", new Date(2020, 11, 11), 3, 440, project2, "Almost done with that project, time to finish it up!", "open");
var taskNum4 = new Task("Lost Task", new Date(2020, 11, 11), 4, 120, project0, "This task lost it's project home :(", "open");
var taskNum5 = new Task("Climb Mount Everest", new Date(2020, 11, 01), 1, 1440, project1, "Get to the top!", "completed");
//Default projects
var project0 = new Project("Uncategorized", true, [taskNum4], [], []);
var project1 = new Project("Personal", true, [taskNum1,taskNum2], [taskNum5], []);
var project2 = new Project("Work", true, [taskNum3], [], []);
var projects = [project0, project1, project2];

editTaskCancel.addEventListener("click", ()=> {
    document.querySelector("#editTaskLayer").style.display = "none";
})

editProjectCancel.addEventListener("click", ()=> {
    document.querySelector("#editProjectLayer").style.display = "none";
})

addProject.addEventListener("click", ()=> {
    document.querySelector("#projectNew").value = true;
    document.querySelector("#editProjectTitle").value = "";

    document.querySelector("#editProjectLayer").style.display = "block";
})

editProjectDelete.addEventListener("click", ()=> {
    const projectNum = document.querySelector('#editProjectNum').value;
    projects[projectNum] = false;
    let nextAvailProject = 0;
    for (let i = 1, n = projects.length ; i < n ; i++) {
        if (projects[i].status == true) {
            nextAvailProject = i;
            break;
        }
    }

    displayProjects(nextAvailProject);
    makeProjectActive(nextAvailProject);
    document.querySelector("#editProjectLayer").style.display = "none";
})

editProjectSubmit.addEventListener("click", ()=> {
    const projectNew = document.querySelector('#projectNew').value;
    const title = document.querySelector('#editProjectTitle').value;
    let projectNum = 0;

    if (title != "") {
        
        if (projectNew == "false") {
            projectNum = document.querySelector('#editProjectNum').value;
            projects[projectNum].title = title;
        }
        else {
            var insertNewProject = new Project(title, true, [], [], []);
            projects.push(insertNewProject);
            projectNum = projects.length-1;

            var editTaskProject = document.querySelector('#editTaskProject');
            var newOption = document.createElement('option');
            newOption.textContent = title;
            newOption.value = projectNum;
            editTaskProject.add(newOption, 0);
        }
        displayProjects(projectNum);
        displayTasks(projectNum);
        document.querySelector("#editProjectLayer").style.display = "none";
    }
})

editTaskSubmit.addEventListener("click", ()=> {
    const taskNum = document.querySelector('#editTaskNum').value;
    const projectNum = document.querySelector('#editTaskProject').value;
    const projectNumOrig = document.querySelector('#editTaskProjectOrig').value;
    const currentTask = projects[projectNumOrig].openTasks[taskNum];
    const title = document.querySelector('#editTaskTitle').value;
    const dueDate = document.querySelector('#editTaskDueDate').value;
    const dueDateInsert = new Date(dueDate.substring(0,4), (dueDate.substring(5,7)) - 1, dueDate.substring(8,10));
    const priority = document.querySelector('#editTaskPriority').value;

    if (title != "" && dueDate != "" && priority != "") {
        currentTask.title = title;
        currentTask.dueDate = dueDateInsert;
        currentTask.priority = priority;
        currentTask.duration = document.querySelector('#editTaskDuration').value;
        currentTask.notes = document.querySelector('#editTaskNotes').value;
        if (projectNum != projectNumOrig) {
            currentTask.project = projects[projectNum];
            projects[projectNum].openTasks.push(projects[projectNumOrig].openTasks[taskNum]);
            projects[projectNumOrig].openTasks.splice(taskNum, 1);
            displayProjects(projectNum);
        }
        
        displayTasks(projectNum);
        document.querySelector("#editTaskLayer").style.display = "none";
    }
})

editTaskDelete.addEventListener("click", (details)=> {
    const taskStatus = document.querySelector('#editTaskStatus').value;
    const taskNum = document.querySelector('#editTaskNum').value;
    const projectNum = document.querySelector('#editTaskProject').value;
    
    if (taskStatus == "open") {
        projects[projectNum].hiddenTasks.push(projects[projectNum].openTasks[taskNum]);
        projects[projectNum].openTasks[taskNum].status = "hidden";
        projects[projectNum].openTasks.splice(taskNum, 1);
    }
    else if (taskStatus == "completed") {
        projects[projectNum].hiddenTasks.push(projects[projectNum].completedTasks[taskNum]);
        projects[projectNum].completedTasks[taskNum].status = "hidden";
        projects[projectNum].completedTasks.splice(taskNum, 1);
    }

    displayProjects(projectNum);
    displayTasks(projectNum);
    document.querySelector("#editTaskLayer").style.display = "none";
})

function makeProjectActive(projectNum) {
    for (let i = 0; i < projects.length; i++) {
        const element = document.querySelectorAll("[data-navNum='" + i + "']");
        for (let x = 0; x < element.length; x++) {
            element[x].classList.remove("active");
        }
    }
    const currentDataNum = (isFinite(projectNum) == false) ? this.getAttribute("data-navNum") : projectNum;
    const element = document.querySelectorAll("[data-navNum='" + currentDataNum + "']");
    for (let i = 0; i < element.length; i++) {
        element[i].classList.add("active");
    }
    displayTasks(currentDataNum);
}

function changeTaskStatus(taskNum, projectNum, status) {
    if (status == "open") {    
        projects[projectNum].completedTasks.push(projects[projectNum].openTasks[taskNum]);
        projects[projectNum].openTasks[taskNum].status = "completed";
        projects[projectNum].openTasks.splice(taskNum, 1);
    }
    if (status == "completed") {
        projects[projectNum].openTasks.push(projects[projectNum].completedTasks[taskNum]);
        projects[projectNum].completedTasks[taskNum].status = "open";
        projects[projectNum].completedTasks.splice(taskNum, 1);
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

function formatDate(value) {
   return (value.getMonth() + 1) + "/" + value.getDate() + "/" + value.getFullYear();
}

function formatDateForEdit(value) {
    const month = (value.getMonth() + 1 > 9) ? (value.getMonth() + 1) : "0" + (value.getMonth() + 1)
    const date = (value.getDate() + 1 > 9) ? (value.getDate()) : "0" + (value.getDate())
    return value.getFullYear() + "-" + month + "-" + date;
}

function addNewTask() {
    const formTitle = document.querySelector('#addEditTaskTitle').value;
    const dueDate = document.querySelector('#addEditTaskDate').value;
    const formDate = new Date(dueDate.substring(0,4), (dueDate.substring(5,7)) - 1, dueDate.substring(8,10));
    const formPriority = document.querySelector('#addEditTaskPriority').value;
    const formDuration = null;
    const projectNum = document.querySelector('#projectNum').value
    const formNotes = "";
    const taskStatus = "open";

    if (formPriority != "" && formTitle != "" && formDate != "") {
        var intsertTask = new Task(formTitle, formDate, formPriority, formDuration, projects[projectNum], formNotes, taskStatus);
        projects[projectNum].openTasks.push(intsertTask);
        displayProjects(projectNum);
        displayTasks(projectNum);
    }
}

function generateProjectOptionsToDropdown() {
    var editTaskProject = document.querySelector('#editTaskProject');

    for (let i = 1, n = projects.length; i < n; i++) {
        var newOption = document.createElement('option');
        newOption.textContent = projects[i].title;
        newOption.value = i;
        editTaskProject.add(newOption, 0);
    }
}

function openTaskEdit(taskNum, projectNum, taskStatus) {
    const currentTask = (taskStatus == "open") ? projects[projectNum].openTasks[taskNum] : projects[projectNum].completedTasks[taskNum];
    document.querySelector('#editTaskTitle').value = currentTask.title;
    document.querySelector('#editTaskDueDate').value = formatDateForEdit(currentTask.dueDate);
    document.querySelector('#editTaskPriority').value = currentTask.priority;
    document.querySelector('#editTaskDuration').value = currentTask.duration;
    document.querySelector('#editTaskProject').selected = projects[projectNum].title;
    document.querySelector('#editTaskNotes').value = currentTask.notes;
    document.querySelector('#editTaskProject').value = projectNum;
    document.querySelector('#editTaskProjectOrig').value = projectNum;
    document.querySelector('#editTaskNum').value = taskNum;
    document.querySelector('#editTaskStatus').value = currentTask.status;

    document.querySelector("#editTaskLayer").style.display = "block";
}

function openProjectEdit(projectNum) {
    document.querySelector('#editProjectNum').value = projectNum;
    document.querySelector('#editProjectTitle').value = projects[projectNum].title;
    document.querySelector('#projectNew').value = false;

    document.querySelector("#editProjectLayer").style.display = "block";
}

function displayProjects(activeProject) {
    document.querySelector('#navBarProjectContainer').innerHTML = "";
    const navBarProjectContainer = document.querySelector('#navBarProjectContainer');

    function insertProject(projectNum) {
        const navBarProject = document.createElement("div");
        navBarProject.setAttribute("data-navNum", projectNum);
        navBarProject.setAttribute("id", "proje" + projectNum);
        (projectNum == activeProject) ? navBarProject.className = "navBarProject active" : navBarProject.className = "navBarProject";
        navBarProject.addEventListener('click', ()=> {makeProjectActive(projectNum)});
        navBarProjectContainer.appendChild(navBarProject);

        const addElement1 = document.createElement("input");
        addElement1.setAttribute("type", "button");
        addElement1.setAttribute("data-navNum", projectNum);
        addElement1.setAttribute("value", "O O O");
        addElement1.addEventListener('click', ()=> {openProjectEdit(projectNum)});
        (projectNum == activeProject) ? addElement1.className = "navBarProjectSettings navBarProjectHover active" : addElement1.className = "navBarProjectSettings navBarProjectHover";
        navBarProject.appendChild(addElement1);

        const addElement2 = document.createElement("input");
        addElement2.setAttribute("type", "button");
        addElement2.setAttribute("data-navNum", projectNum);
        addElement2.setAttribute("value", projects[projectNum].title);
        (projectNum == activeProject) ? addElement2.className = "navBarProjectButton navBarProjectHover active" : addElement2.className = "navBarProjectButton navBarProjectHover";
        navBarProject.appendChild(addElement2);

        const addElement3 = document.createElement("p");
        addElement3.setAttribute("data-navNum", projectNum);
        (projectNum == activeProject) ? addElement3.className = "navBarProjectCount navBarProjectHover active" : addElement3.className = "navBarProjectCount navBarProjectHover";
        const textNode = document.createTextNode(projects[projectNum].openTasks.length);
        addElement3.appendChild(textNode);
        navBarProject.appendChild(addElement3);
    }

    for (let i = 1, n = projects.length; i < n; i++) {
        if (projects[i].status == true) {
            insertProject(i);
        }
    }
    if (projects[0].openTasks.length > 0) {
        insertProject(0);
    }
}

function insertTasks(projectNum, status) {
    const mainContent = document.querySelector('#mainOpenTaskContainer');
    for (let i = 0, n = (status == "open") ? projects[projectNum].openTasks.length : projects[projectNum].completedTasks.length; i < n; i++) {
        const currentTask = (status == "open") ? projects[projectNum].openTasks[i] : projects[projectNum].completedTasks[i];
        const addMainContentTask = document.createElement("div");
        addMainContentTask.className = "mainContentTask";
        mainContent.appendChild(addMainContentTask);
        const addElement1 = document.createElement("label");
        addElement1.className = "completedTask";
        const addElement11 = document.createElement("input");
        addElement11.setAttribute("type", "checkbox");
        (status == "completed") ? addElement11.checked = true : addElement11.checked = false;;
        addElement11.className = "completedTask";
        addElement11.addEventListener('click', ()=> {changeTaskStatus(i, projectNum, status)});
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
        addElement5.addEventListener('click', ()=> {openTaskEdit(i, projectNum, status)});
        addMainContentTask.appendChild(addElement5);
    }
}

function displayTasks(projectNum) {
    document.querySelector('#mainOpenTaskContainer').innerHTML = "";
    const mainContent = document.querySelector('#mainOpenTaskContainer');
    
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
        addNewTaskButton.addEventListener('click', addTask);
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
        addElement1.addEventListener('click', cancelAddTask);
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
        addElement5.addEventListener('click', addNewTask);
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


(function main() {
    displayProjects(1);
    generateProjectOptionsToDropdown();
    displayTasks(1);
})()
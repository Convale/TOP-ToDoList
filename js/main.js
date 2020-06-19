function updateProjectStorage(projectNum, key, value) {
    const projectsLS = JSON.parse(localStorage.getItem("projects"));
    projectsLS[projectNum][key] = value;
    localStorage.projects = JSON.stringify(projectsLS);
}

function addProjectStorage(insertNewProject) {
    const projectsLS = JSON.parse(localStorage.getItem("projects"));
    projectsLS.push(insertNewProject);
    localStorage.projects = JSON.stringify(projectsLS);
}

function updateTaskStorage(projectNum, taskNum, taskType, taskObject) {
    const projectsLS = JSON.parse(localStorage.getItem("projects"));
    projectsLS[projectNum][taskType][taskNum] = taskObject;
    localStorage.projects = JSON.stringify(projectsLS);
}

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
    const projectsLS = JSON.parse(localStorage.getItem("projects"));
    updateProjectStorage(projectNum, "status", false);
    let nextAvailProject = 0;
    for (let i = 1, n = projectsLS.length ; i < n ; i++) {
        if (projectsLS[i].status == true) {
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
            updateProjectStorage(projectNum, "title", title);
        }
        else {
            var insertNewProject = new Project(title, true, [], [], []);
            addProjectStorage(insertNewProject);
            const projectsLS = JSON.parse(localStorage.getItem("projects"));
            projectNum = projectsLS.length-1;
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
    const projectsLS = JSON.parse(localStorage.getItem("projects"));
    const taskNum = document.querySelector('#editTaskNum').value;
    const projectNum = document.querySelector('#editTaskProject').value;
    const projectNumOrig = document.querySelector('#editTaskProjectOrig').value;
    const currentTask = projectsLS[projectNumOrig].openTasks[taskNum];
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
        updateTaskStorage(projectNumOrig, taskNum, "openTasks", currentTask);

        if (projectNum != projectNumOrig) {
            projectsLS[projectNum].openTasks.push(projectsLS[projectNumOrig].openTasks[taskNum]);
            projectsLS[projectNumOrig].openTasks.splice(taskNum, 1);
            localStorage.projects = JSON.stringify(projectsLS);
            displayProjects(projectNum);
        }

        displayTasks(projectNum);
        document.querySelector("#editTaskLayer").style.display = "none";
    }
})

editTaskDelete.addEventListener("click", (details)=> {
    const projectsLS = JSON.parse(localStorage.getItem("projects"));
    const taskStatus = document.querySelector('#editTaskStatus').value;
    const taskNum = document.querySelector('#editTaskNum').value;
    const projectNum = document.querySelector('#editTaskProject').value;
    
    if (taskStatus == "open") {
        projectsLS[projectNum].hiddenTasks.push(projectsLS[projectNum].openTasks[taskNum]);
        projectsLS[projectNum].openTasks[taskNum].status = "hidden";
        projectsLS[projectNum].openTasks.splice(taskNum, 1);
        localStorage.projects = JSON.stringify(projectsLS);
    }
    else if (taskStatus == "completed") {
        projectsLS[projectNum].hiddenTasks.push(projectsLS[projectNum].completedTasks[taskNum]);
        projectsLS[projectNum].completedTasks[taskNum].status = "hidden";
        projectsLS[projectNum].completedTasks.splice(taskNum, 1);
        localStorage.projects = JSON.stringify(projectsLS);
    }

    displayProjects(projectNum);
    displayTasks(projectNum);
    document.querySelector("#editTaskLayer").style.display = "none";
})

function makeProjectActive(projectNum) {
    const projectsLS = JSON.parse(localStorage.getItem("projects"));
    for (let i = 0; i < projectsLS.length; i++) {
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
    const projectsLS = JSON.parse(localStorage.getItem("projects"));
    
    if (status == "open") {    
        projectsLS[projectNum].completedTasks.push(projectsLS[projectNum].openTasks[taskNum]);
        projectsLS[projectNum].openTasks[taskNum].status = "completed";
        projectsLS[projectNum].openTasks.splice(taskNum, 1);
        localStorage.projects = JSON.stringify(projectsLS);
    }
    else if (status == "completed") {
        projectsLS[projectNum].openTasks.push(projectsLS[projectNum].completedTasks[taskNum]);
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

function formatDate(value) {
    const convertDate = new Date(value);
    return (convertDate.getMonth() + 1) + "/" + convertDate.getDate() + "/" + convertDate.getFullYear();
}

function formatDateForEdit(value) {
    const convertDate = new Date(value);
    const month = (convertDate.getMonth() + 1 > 9) ? (convertDate.getMonth() + 1) : "0" + (convertDate.getMonth() + 1)
    const date = (convertDate.getDate() + 1 > 9) ? (convertDate.getDate()) : "0" + (convertDate.getDate())
    return convertDate.getFullYear() + "-" + month + "-" + date;
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
        const projectsLS = JSON.parse(localStorage.getItem("projects"));
        var intsertTask = new Task(formTitle, formDate, formPriority, formDuration, formNotes, taskStatus);
        projectsLS[projectNum].openTasks.push(intsertTask);
        localStorage.projects = JSON.stringify(projectsLS);
        displayProjects(projectNum);
        displayTasks(projectNum);
    }
}

function generateProjectOptionsToDropdown() {
    var editTaskProject = document.querySelector('#editTaskProject');
    const projectsLS = JSON.parse(localStorage.getItem("projects"));

    for (let i = 1, n = projectsLS.length; i < n; i++) {
        var newOption = document.createElement('option');
        newOption.textContent = projectsLS[i].title;
        newOption.value = i;
        editTaskProject.add(newOption, 0);
    }
}

function openTaskEdit(taskNum, projectNum, taskStatus) {
    const projectsLS = JSON.parse(localStorage.getItem("projects"));
    const currentTask = (taskStatus == "open") ? projectsLS[projectNum].openTasks[taskNum] : projectsLS[projectNum].completedTasks[taskNum];
    document.querySelector('#editTaskTitle').value = currentTask.title;
    document.querySelector('#editTaskDueDate').value = formatDateForEdit(currentTask.dueDate);
    document.querySelector('#editTaskPriority').value = currentTask.priority;
    document.querySelector('#editTaskDuration').value = currentTask.duration;
    document.querySelector('#editTaskProject').selected = projectsLS[projectNum].title;
    document.querySelector('#editTaskNotes').value = currentTask.notes;
    document.querySelector('#editTaskProject').value = projectNum;
    document.querySelector('#editTaskProjectOrig').value = projectNum;
    document.querySelector('#editTaskNum').value = taskNum;
    document.querySelector('#editTaskStatus').value = currentTask.status;

    document.querySelector("#editTaskLayer").style.display = "block";
}

function openProjectEdit(projectNum) {
    document.querySelector('#editProjectNum').value = projectNum;
    const projectsLS = JSON.parse(localStorage.getItem("projects"));
    document.querySelector('#editProjectTitle').value = projectsLS[projectNum].title;
    document.querySelector('#projectNew').value = false;

    document.querySelector("#editProjectLayer").style.display = "block";
}

function displayProjects(activeProject) {
    document.querySelector('#navBarProjectContainer').innerHTML = "";
    const navBarProjectContainer = document.querySelector('#navBarProjectContainer');
    const projectsLS = JSON.parse(localStorage.getItem("projects"));

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
        addElement2.setAttribute("value", projectsLS[projectNum].title);
        (projectNum == activeProject) ? addElement2.className = "navBarProjectButton navBarProjectHover active" : addElement2.className = "navBarProjectButton navBarProjectHover";
        navBarProject.appendChild(addElement2);

        const addElement3 = document.createElement("p");
        addElement3.setAttribute("data-navNum", projectNum);
        (projectNum == activeProject) ? addElement3.className = "navBarProjectCount navBarProjectHover active" : addElement3.className = "navBarProjectCount navBarProjectHover";
        const textNode = document.createTextNode(projectsLS[projectNum].openTasks.length);
        addElement3.appendChild(textNode);
        navBarProject.appendChild(addElement3);
    }

    for (let i = 1, n = projectsLS.length; i < n; i++) {
        if (projectsLS[i].status == true) {
            insertProject(i);
        }
    }
    if (projectsLS[0].openTasks.length > 0) {
        insertProject(0);
    }
}

function insertTasks(projectNum, status) {
    const mainContent = document.querySelector('#mainOpenTaskContainer');
    const projectsLS = JSON.parse(localStorage.getItem("projects"));

    for (let i = 0, n = (status == "open") ? projectsLS[projectNum].openTasks.length : projectsLS[projectNum].completedTasks.length; i < n; i++) {
        const currentTask = (status == "open") ? projectsLS[projectNum].openTasks[i] : projectsLS[projectNum].completedTasks[i];
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

function storageAvailable(type) {
    //function source: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);

        //if (localStorage.getItem("projects") === null) {
            loadOrigData();
        //}

        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

(function main() {
    //check localstorage    
    if (!storageAvailable('localStorage')) { 
        alert("This site uses settings on your browser that are not available or turned off. Please enable localstorage.");
    }

    //display the navbar
    displayProjects(1);

    //populate the projects as options for editing tasks
    generateProjectOptionsToDropdown();

    //display the tasks for selected project
    displayTasks(1);
})()
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

function loadOrigData() {
    //Test Tasks
    const taskNum1 = new Task("Workout", new Date(2020, 11, 31), 1, 120, "Doing great with your routine, keep it up!", "open");
    const taskNum2 = new Task("Meditate", new Date(2020, 11, 20), 2, 120, "Keep meditating!", "open");
    const taskNum3 = new Task("Work on Project", new Date(2020, 11, 11), 3, 440, "Almost done with that project, time to finish it up!", "open");
    const taskNum4 = new Task("Lost Task", new Date(2020, 11, 11), 4, 120, "This task lost it's project home :(", "open");
    const taskNum5 = new Task("Climb Mount Everest", new Date(2020, 11, 01), 1, 1440, "Get to the top!", "completed");

    //Default projects
    var project0 = new Project("Uncategorized", true, [taskNum4], [], []);
    var project1 = new Project("Personal", true, [taskNum1,taskNum2], [taskNum5], []);
    var project2 = new Project("Work", true, [taskNum3], [], []);

    const projects = [project0, project1, project2];
    localStorage.projects = JSON.stringify(projects);
}
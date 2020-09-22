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

function storageAvailable(type) {
  //function source: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  var storage;
  try {
    storage = window[type];
    var x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);

    if (localStorage.getItem("projects") === null) {
      loadOrigData();
    }

    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function loadOrigData() {
  //test tasks
  const taskNum1 = new Task(
    "Workout",
    new Date(2020, 11, 31),
    1,
    120,
    "Doing great with your routine, keep it up!",
    "open"
  );
  const taskNum2 = new Task(
    "Meditate",
    new Date(2020, 11, 20),
    2,
    120,
    "Keep meditating!",
    "open"
  );
  const taskNum3 = new Task(
    "Work on Project",
    new Date(2020, 11, 11),
    3,
    440,
    "Almost done with that project, time to finish it up!",
    "open"
  );
  const taskNum4 = new Task(
    "Lost Task",
    new Date(2020, 11, 11),
    4,
    120,
    "This task lost it's project home :(",
    "open"
  );
  const taskNum5 = new Task(
    "Climb Mount Everest",
    new Date(2020, 11, 01),
    1,
    1440,
    "Get to the top!",
    "completed"
  );

  //default projects
  var project0 = new Project("Uncategorized", true, [taskNum4], [], []);
  var project1 = new Project(
    "Personal",
    true,
    [taskNum1, taskNum2],
    [taskNum5],
    []
  );
  var project2 = new Project("Work", true, [taskNum3], [], []);

  const projects = [project0, project1, project2];
  localStorage.projects = JSON.stringify(projects);
}

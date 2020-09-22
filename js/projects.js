function displayProjects(activeProject) {
  document.querySelector("#navBarProjectContainer").innerHTML = "";
  const navBarProjectContainer = document.querySelector(
    "#navBarProjectContainer"
  );
  const projectsLS = JSON.parse(localStorage.getItem("projects"));

  function insertProject(projectNum) {
    const navBarProject = document.createElement("div");
    navBarProject.setAttribute("data-navNum", projectNum);
    navBarProject.setAttribute("id", "proje" + projectNum);
    projectNum == activeProject
      ? (navBarProject.className = "navBarProject active")
      : (navBarProject.className = "navBarProject");
    navBarProject.addEventListener("click", () => {
      makeProjectActive(projectNum);
    });
    navBarProjectContainer.appendChild(navBarProject);

    const addElement1 = document.createElement("input");
    addElement1.setAttribute("type", "button");
    addElement1.setAttribute("data-navNum", projectNum);
    addElement1.setAttribute("value", "O O O");
    addElement1.addEventListener("click", () => {
      openProjectEdit(projectNum);
    });
    projectNum == activeProject
      ? (addElement1.className =
          "navBarProjectSettings navBarProjectHover active")
      : (addElement1.className = "navBarProjectSettings navBarProjectHover");
    navBarProject.appendChild(addElement1);

    const addElement2 = document.createElement("input");
    addElement2.setAttribute("type", "button");
    addElement2.setAttribute("data-navNum", projectNum);
    addElement2.setAttribute("value", projectsLS[projectNum].title);
    projectNum == activeProject
      ? (addElement2.className =
          "navBarProjectButton navBarProjectHover active")
      : (addElement2.className = "navBarProjectButton navBarProjectHover");
    navBarProject.appendChild(addElement2);

    const addElement3 = document.createElement("p");
    addElement3.setAttribute("data-navNum", projectNum);
    projectNum == activeProject
      ? (addElement3.className = "navBarProjectCount navBarProjectHover active")
      : (addElement3.className = "navBarProjectCount navBarProjectHover");
    const textNode = document.createTextNode(
      projectsLS[projectNum].openTasks.length
    );
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

function openProjectEdit(projectNum) {
  document.querySelector("#editProjectNum").value = projectNum;
  const projectsLS = JSON.parse(localStorage.getItem("projects"));
  document.querySelector("#editProjectTitle").value =
    projectsLS[projectNum].title;
  document.querySelector("#projectNew").value = false;

  document.querySelector("#editProjectLayer").style.display = "block";
}

function makeProjectActive(projectNum) {
  const projectsLS = JSON.parse(localStorage.getItem("projects"));
  for (let i = 0; i < projectsLS.length; i++) {
    const element = document.querySelectorAll("[data-navNum='" + i + "']");
    for (let x = 0; x < element.length; x++) {
      element[x].classList.remove("active");
    }
  }
  const currentDataNum =
    isFinite(projectNum) == false
      ? this.getAttribute("data-navNum")
      : projectNum;
  const element = document.querySelectorAll(
    "[data-navNum='" + currentDataNum + "']"
  );
  for (let i = 0; i < element.length; i++) {
    element[i].classList.add("active");
  }
  displayTasks(currentDataNum);
}

editProjectCancel.addEventListener("click", () => {
  document.querySelector("#editProjectLayer").style.display = "none";
});

addProject.addEventListener("click", () => {
  document.querySelector("#projectNew").value = true;
  document.querySelector("#editProjectTitle").value = "";

  document.querySelector("#editProjectLayer").style.display = "block";
});

editProjectDelete.addEventListener("click", () => {
  const projectNum = document.querySelector("#editProjectNum").value;
  const projectsLS = JSON.parse(localStorage.getItem("projects"));
  updateProjectStorage(projectNum, "status", false);
  let nextAvailProject = 0;
  for (let i = 1, n = projectsLS.length; i < n; i++) {
    if (projectsLS[i].status == true) {
      nextAvailProject = i;
      break;
    }
  }

  displayProjects(nextAvailProject);
  makeProjectActive(nextAvailProject);
  document.querySelector("#editProjectLayer").style.display = "none";
});

editProjectSubmit.addEventListener("click", () => {
  const projectNew = document.querySelector("#projectNew").value;
  const title = document.querySelector("#editProjectTitle").value;
  let projectNum = 0;

  if (title != "") {
    if (projectNew == "false") {
      projectNum = document.querySelector("#editProjectNum").value;
      updateProjectStorage(projectNum, "title", title);
    } else {
      var insertNewProject = new Project(title, true, [], [], []);
      addProjectStorage(insertNewProject);
      const projectsLS = JSON.parse(localStorage.getItem("projects"));
      projectNum = projectsLS.length - 1;
      var editTaskProject = document.querySelector("#editTaskProject");
      var newOption = document.createElement("option");
      newOption.textContent = title;
      newOption.value = projectNum;
      editTaskProject.add(newOption, 0);
    }
    displayProjects(projectNum);
    displayTasks(projectNum);
    document.querySelector("#editProjectLayer").style.display = "none";
  }
});

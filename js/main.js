function formatDate(value) {
  const convertDate = new Date(value);
  return (
    convertDate.getMonth() +
    1 +
    "/" +
    convertDate.getDate() +
    "/" +
    convertDate.getFullYear()
  );
}

function formatDateForEdit(value) {
  const convertDate = new Date(value);
  const month =
    convertDate.getMonth() + 1 > 9
      ? convertDate.getMonth() + 1
      : "0" + (convertDate.getMonth() + 1);
  const date =
    convertDate.getDate() + 1 > 9
      ? convertDate.getDate()
      : "0" + convertDate.getDate();
  return convertDate.getFullYear() + "-" + month + "-" + date;
}

function generateProjectOptionsToDropdown() {
  var editTaskProject = document.querySelector("#editTaskProject");
  const projectsLS = JSON.parse(localStorage.getItem("projects"));

  for (let i = 1, n = projectsLS.length; i < n; i++) {
    var newOption = document.createElement("option");
    newOption.textContent = projectsLS[i].title;
    newOption.value = i;
    editTaskProject.add(newOption, 0);
  }
}

(function main() {
  //check localstorage
  if (!storageAvailable("localStorage")) {
    alert(
      "This site uses settings on your browser that are not available or turned off. Please enable localstorage."
    );
  }

  //display the navbar
  displayProjects(1);

  //populate the projects as options for editing tasks
  generateProjectOptionsToDropdown();

  //display the tasks for selected project
  displayTasks(1);
})();

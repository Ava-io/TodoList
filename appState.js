import ProjectList from "./projectList.js";
import Projects from "./project.js";
import Todo from "./todo.js";

const projectData = new ProjectList();
export default projectData;

export function saveToLocalStorage() {
  localStorage.setItem("projectData", JSON.stringify(projectData));
}

export function loadFromLocalStorage() {
  const savedData = localStorage.getItem("projectData");
  if (!savedData) return;

  const parsedData = JSON.parse(savedData);
  const rebuildProjects = parsedData.projects.map((projectPlain) => {
    const project = new Projects(projectPlain.name);
    project.todos = projectPlain.todos.map((todoPlain) => new Todo(todoPlain));
    return project;
  });

  projectData.projects = rebuildProjects;
  projectData.currentProject = rebuildProjects.find(
    (p) => p.name === parsedData.currentProject.name,
  );
}

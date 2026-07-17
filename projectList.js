import Projects from "./project.js";

class ProjectList {
  constructor() {
    const defaultProject = new Projects("default");
    this.projects = [defaultProject];
    this.currentProject = defaultProject;
  }

  createProject(projectName) {
    const newProject = new Projects(projectName);
    this.projects.push(newProject);
  }

  deleteProject(project) {
    this.projects = this.projects.filter((p) => p !== project);
  }

  switchProject(name) {
    this.currentProject = this.projects.find((p) => p.name === name);
  }

  addTodoToCurrentProject(todo) {
    this.currentProject.addTodo(todo);
  }
}

a

export default ProjectList;

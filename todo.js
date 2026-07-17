class Todo {
  constructor({
    title,
    description,
    dueDate,
    priority,
    status = "pending",
    notes = "no notes yet",
    checkList = [],
  } = {}) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
    this.notes = notes;
    this.checkList = checkList;
  }
}

export default Todo;

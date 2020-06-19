class Task { 
    constructor(title, dueDate, priority, duration, notes, status) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.duration = duration;
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
var Routes = require('./routes');
var routes = new Routes();

var TodoStore = {
  _state: {
    todo: [],
  },

  getState: function() {
    return this._state;
  },

  loadProject: function() {
    var obj = this;
    $.getJSON(routes.projectsIndex(), function(data) {
      obj._state.todo = data;
      obj.onChange();
    });
  },

  onChange: function() {},

  deleteProject: function(project) {
    var todo = this.getState().todo.filter(function(item) {
      return item.id !== project.id;
    });
    this._state.todo = todo;
    this.onChange();

    $.ajax({
      url: Routes.projectsDestroy(project.id),
      dataType: 'json',
      cache: false,
      method: 'DELETE',
      success: function(data) {}.bind(this),
      error: function(xhr, status, err) {}.bind(this)
    });
  },

  deleteTask: function(project, task) {
    var todo = this.getState().todo.map(function(project) {
      var tasks = project.tasks.filter(function(taskItem) {
        return taskItem.id !== task.id;
      });
      project.tasks = tasks;
      return project;
    });

    this._state.todo = todo;
    this.onChange();

    $.ajax({
      url: Routes.tasksDestory(project.id, task.id),
      dataType: 'json',
      cache: false,
      method: 'DELETE',
      success: function(data) {}.bind(this),
      error: function(xhr, status, err) {}.bind(this)
    });
  },

  createTask: function(project, taskInput) {
    var description = taskInput.value;
    var obj = this;
    if (!description) { return false; }
    $.post(Routes.tasksCreate(project.id), { task: { description: description } }, function(data) {
      var todo = obj.getState().todo.map(function(projectItem) {
        if (projectItem.id === project.id) {
          projectItem.tasks.push({
            id: data.id,
            description: data.description,
            completed: data.completed
          });
        }
        return projectItem;
      });

      obj._state.todo = todo;
      obj.onChange();

      taskInput.value = '';
    });
  },

  completeTask: function(project, task, complete) {
    $.ajax({
      url: Routes.tasksComplete(project.id, task.id),
      dataType: 'json',
      cache: false,
      method: 'PUT',
      data: { task: { complete: complete } },
      success: function(data) {}.bind(this),
      error: function(xhr, status, err) {}.bind(this)
    });
  },

  editTask: function(project, task, description) {
    $.ajax({
      url: Routes.tasksPut(project.id, task.id),
      dataType: 'json',
      cache: false,
      method: 'PUT',
      data: { task: { description: description } },
      success: function(data) {}.bind(this),
      error: function(xhr, status, err) {}.bind(this)
    });
  },

  createProject: function() {
    var obj = this;
    $.post(Routes.projectsCreate(), function(data) {
      var todo = obj.getState().todo;
      todo.push({
        id: data.id,
        title: data.title,
        tasks: data.tasks,
      });

      obj._state.todo = todo;
      obj.onChange();
    });
  },

  editProject: function(project, title) {
    $.ajax({
      url: Routes.projectsPut(project.id),
      dataType: 'json',
      cache: false,
      method: 'PUT',
      data: { project: { title: title } },
      success: function(data) {}.bind(this),
      error: function(xhr, status, err) {}.bind(this)
    });
  }
};

module.exports = TodoStore;

import $ from 'jquery';
import Routes from './Routes';

var routes = new Routes();

export default class WebRequest {
  static loadProjects(store) {
    $.getJSON(routes.projectsIndex(), (data) => {
      store._state.todo = data;
      store.onChange();
    });
  }

  static deleteTask(projectId, taskId) {
    $.ajax({
      url: routes.tasksDestory(projectId, taskId),
      dataType: 'json',
      cache: false,
      method: 'DELETE',
      success: function(data) {},
      error: function(xhr, status, err) {}
    });
  }

  static completeTask(projectId, taskId, complete) {
    $.ajax({
      url: routes.tasksComplete(projectId, taskId),
      dataType: 'json',
      cache: false,
      method: 'PUT',
      data: { task: { complete } },
      success: function(data) {},
      error: function(xhr, status, err) {}
    });
  }

  static editTask(projectId, taskId, description) {
    $.ajax({
      url: routes.tasksPut(projectId, taskId),
      dataType: 'json',
      cache: false,
      method: 'PUT',
      data: { task: { description } },
      success: function(data) {},
      error: function(xhr, status, err) {}
    });
  }

  static createTask(projectId, taskInput, store) {
    let description = taskInput.value;
    $.post(routes.tasksCreate(projectId), { task: { description } }, (data) => {
      let todo = store.getState().todo;
      todo.map((projectItem) => {
        if (projectItem.id === projectId) {
          projectItem.tasks.push({
            id: data.id,
            description: data.description,
            completed: data.completed
          });
        }
      });

      store.onChange();
      taskInput.value = '';
    });
  }

  static editProject(projectId, title) {
    $.ajax({
      url: routes.projectsPut(projectId),
      dataType: 'json',
      cache: false,
      method: 'PUT',
      data: { project: { title } },
      success: function(data) {},
      error: function(xhr, status, err) {}
    });
  }

  static deleteProject(projectId) {
    $.ajax({
      url: routes.projectsDestroy(projectId),
      dataType: 'json',
      cache: false,
      method: 'DELETE',
      success: function(data) {},
      error: function(xhr, status, err) {}
    });
  }

  static createProject(store) {
    $.post(routes.projectsCreate(), (data) => {
      let todo = store.getState().todo;
      todo.push({
        id: data.id,
        title: data.title,
        tasks: data.tasks,
      });
      store._state.todo = todo;
      store.onChange();
    });
  }
}
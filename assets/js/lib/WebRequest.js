import $ from 'jquery';
import Routes from './Routes';
import Actions from '../flux/Actions';
import * as dispatcher from '../flux/Dispatcher';

var routes = new Routes();

export default class WebRequest {

  static loadProjects() {
    $.getJSON(routes.projectsIndex(), (data) => {
      dispatcher.emit(Actions.LOAD_PROJECTS, { data });
    });
  }

  static deleteTask({ projectId, taskId }) {
    $.ajax({
      url: routes.tasksDestory(projectId, taskId),
      dataType: 'json',
      cache: false,
      method: 'DELETE',
      success: function(data) {},
      error: function(xhr, status, err) {}
    });
  }

  static completeTask({ projectId, taskId, complete }) {
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

  static editTask({ projectId, taskId, description }) {
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

  static createTask({ projectId, taskInput }) {
    let description = taskInput.value;
    $.post(routes.tasksCreate(projectId), { task: { description } }, (data) => {
      dispatcher.emit(Actions.CREATE_TASK, { projectId, taskInput, data });
    });
  }

  static editProject({ projectId, title }) {
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

  static deleteProject({ projectId }) {
    $.ajax({
      url: routes.projectsDestroy(projectId),
      dataType: 'json',
      cache: false,
      method: 'DELETE',
      success: function(data) {},
      error: function(xhr, status, err) {}
    });
  }

  static createProject() {
    $.post(routes.projectsCreate(), (data) => {
      dispatcher.emit(Actions.CREATE_PROJECT, { data });
    });
  }
}

dispatcher.listen(Actions.LOAD_PROJECTS_REQUEST, WebRequest.loadProjects);

dispatcher.listen(Actions.CREATE_PROJECT_REQUEST, WebRequest.createProject);
dispatcher.listen(Actions.EDIT_PROJECT_REQUEST, WebRequest.editProject);
dispatcher.listen(Actions.DELETE_PROJECT_REQUEST, WebRequest.deleteProject);

dispatcher.listen(Actions.CREATE_TASK_REQUEST, WebRequest.createTask);
dispatcher.listen(Actions.COMPLETE_TASK_REQUEST, WebRequest.completeTask);
dispatcher.listen(Actions.EDIT_TASK_REQUEST, WebRequest.editTask);
dispatcher.listen(Actions.DELETE_TASK_REQUEST, WebRequest.deleteTask);

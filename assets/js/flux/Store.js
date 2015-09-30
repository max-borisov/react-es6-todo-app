import * as dispatcher from './Dispatcher';
import Actions from './Actions';
import WebRequest from '../lib/WebRequest';

class Store {

  // static get instance() {
  //   if (!this.storeInstance) {
  //     this.storeInstance = new Store();
  //   }

  //   return this.storeInstance;
  // }

  constructor() {
    this._state = { todo: [] };
    this.changeListeners = [];
  }

  getState() {
    return this._state;
  }

  addChangeListener(cb) {
    this.changeListeners.push(cb);
  }

  onChange() {
    this.changeListeners.forEach((cb) => cb());
  }

  loadProject() {
    WebRequest.loadProjects(this);
  }

  deleteTaskDom({ projectId, taskId }) {
    let todo = Object.assign([], this.getState().todo);
    todo = todo.map((project) => {
      if (project.id === projectId) {
        project.tasks = project.tasks.filter((pt) => pt.id !== taskId);
      }
      return project;
    });
    this._state.todo = todo;
    this.onChange();

    dispatcher.emit(Actions.DELETE_TASK_REQUEST, { projectId, taskId });
    // WebRequest.deleteTask(projectId, taskId);
  }

  deleteTaskRequest({ projectId, taskId }) {
    WebRequest.deleteTask(projectId, taskId);
  }

  completeTask({ projectId, taskId, isComplete }) {
    WebRequest.completeTask(projectId, taskId, isComplete);
  }

  editTask({ projectId, taskId, description }) {
    WebRequest.editTask(projectId, taskId, description);
  }

  createTask({ projectId, taskInput }) {
    if (!taskInput.value) { return false; }
    WebRequest.createTask(projectId, taskInput, this);
  }

  editProject({ projectId, title }) {
    if (!title) { return false; }
    WebRequest.editProject(projectId, title);
  }

  deleteProject({ projectId }) {
    let todo = this.getState().todo;
    todo = todo.filter((projectItem) => projectItem.id !== projectId );
    this._state.todo = todo;
    this.onChange();

    WebRequest.deleteProject(projectId);
  }

  createProject() {
    WebRequest.createProject(this);
  }
}

var store = new Store();

dispatcher.listen(Actions.CREATE_PROJECT, store.createProject.bind(store));
dispatcher.listen(Actions.EDIT_PROJECT, store.editProject.bind(store));
dispatcher.listen(Actions.DELETE_PROJECT, store.deleteProject.bind(store));

dispatcher.listen(Actions.CREATE_TASK, store.createTask.bind(store));
dispatcher.listen(Actions.EDIT_TASK, store.editTask.bind(store));
dispatcher.listen(Actions.COMPLETE_TASK, store.completeTask.bind(store));
dispatcher.listen(Actions.DELETE_TASK_DOM, store.deleteTaskDom.bind(store));
dispatcher.listen(Actions.DELETE_TASK_REQUEST, store.deleteTaskRequest.bind(store));

export default store;

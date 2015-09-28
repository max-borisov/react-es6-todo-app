import Routes from '../lib/Routes';
import * as dispatcher from './Dispatcher';
import Actions from './Actions';
import WebRequest from '../lib/WebRequest';

var routes = new Routes();

class Store {

  static get instance() {
    if (!this.storeInstance) {
      this.storeInstance = new Store();
    }

    return this.storeInstance;
  }

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

  deleteTask({ projectId, taskId }) {
    let todo = this.getState().todo;
    todo.map((t) => {
      if (t.id === projectId) {
        t.tasks = t.tasks.filter((tt) => tt.id !== taskId);
      }
    });
    this._state.todo = todo;
    this.onChange();

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

var store = Store.instance;

dispatcher.listen(Actions.CREATE_PROJECT, store.createProject.bind(store));
dispatcher.listen(Actions.EDIT_PROJECT, store.editProject.bind(store));
dispatcher.listen(Actions.DELETE_PROJECT, store.deleteProject.bind(store));

dispatcher.listen(Actions.CREATE_TASK, store.createTask.bind(store));
dispatcher.listen(Actions.EDIT_TASK, store.editTask.bind(store));
dispatcher.listen(Actions.COMPLETE_TASK, store.completeTask.bind(store));
dispatcher.listen(Actions.DELETE_TASK, store.deleteTask.bind(store));

export default Store;

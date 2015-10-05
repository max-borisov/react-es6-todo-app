import * as dispatcher from './Dispatcher';
import Actions from './Actions';

class Store {

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

  loadProjects({ data }) {
    this._state.todo = data;
    this.onChange();
  }

  deleteTask({ projectId, taskId }) {
    let todo = Object.assign([], this.getState().todo);
    // [...[], ...todo]
    todo = todo.map((project) => {
      if (project.id === projectId) {
        project.tasks = project.tasks.filter((pt) => pt.id !== taskId);
      }
      return project;
    });
    this._state.todo = todo;
    this.onChange();

    dispatcher.emit(Actions.DELETE_TASK_REQUEST, { projectId, taskId });
  }

  createTask({ projectId, taskInput, data }) {
    let todo = Object.assign([], store.getState().todo);
    for (let index in todo) {
      if (todo[index].id === projectId) {
        todo[index].tasks.push({
          id: data.id,
          description: data.description,
          completed: data.completed
        });
      }
    }
    store._state.todo = todo;
    store.onChange();
    taskInput.value = '';
  }

  deleteProject({ projectId }) {
    let todo = Object.assign([], store.getState().todo);
    todo = todo.filter((projectItem) => projectItem.id !== projectId );
    this._state.todo = todo;
    this.onChange();
    dispatcher.emit(Actions.DELETE_PROJECT_REQUEST, { projectId });
  }

  createProject({ data }) {
    let todo = Object.assign([], store.getState().todo);
    todo.push({
      id: data.id,
      title: data.title,
      tasks: data.tasks
    });
    store._state.todo = todo;
    store.onChange();
  }
}

var store = new Store();

dispatcher.listen(Actions.LOAD_PROJECTS, store.loadProjects.bind(store));
dispatcher.listen(Actions.CREATE_PROJECT, store.createProject.bind(store));
dispatcher.listen(Actions.DELETE_PROJECT, store.deleteProject.bind(store));

dispatcher.listen(Actions.CREATE_TASK, store.createTask.bind(store));
dispatcher.listen(Actions.DELETE_TASK, store.deleteTask.bind(store));

export default store;

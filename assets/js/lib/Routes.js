export default class Routes {

  constructor() {
    // this._host = 'https://rails-api-todo-app.herokuapp.com/api';
    this._host = 'http://localhost:5050/api';
  }

  projectsIndex() {
    return this._host + '/projects';
  }

  projectsCreate() {
    return this._host + '/projects';
  }

  projectsDestroy(id) {
    return this._host + '/projects/' + id;
  }

  projectsPut(id) {
    return this._host + '/projects/' + id;
  }

  tasksCreate(project_id) {
    return this._host + '/projects/' + project_id + '/tasks';
  }

  tasksDestory(project_id, id) {
    return this._host + '/projects/' + project_id + '/tasks/' + id;
  }

  tasksPut(project_id, id) {
    return this._host + '/projects/' + project_id + '/tasks/' + id;
  }

  tasksComplete(project_id, id) {
    return this._host + '/projects/' + project_id + '/tasks/' + id + '/complete';
  }
}
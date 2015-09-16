var Routes = {
  host: 'https://rails-api-todo-app.herokuapp.com/api',

  projectsIndex: function() {
    return this.host + '/projects';
  },

  projectsCreate: function() {
    return this.host + '/projects';
  },

  projectsDestroy: function(id) {
    return this.host + '/projects/' + id;
  },

  projectsPut: function(id) {
    return this.host + '/projects/' + id;
  },

  tasksCreate: function(project_id) {
    return this.host + '/projects/' + project_id + '/tasks';
  },

  tasksDestory: function(project_id, id) {
    return this.host + '/projects/' + project_id + '/tasks/' + id;
  },

  tasksPut: function(project_id, id) {
    return this.host + '/projects/' + project_id + '/tasks/' + id;
  },

  tasksComplete: function(project_id, id) {
    return this.host + '/projects/' + project_id + '/tasks/' + id + '/complete';
  }
};

export default Routes;
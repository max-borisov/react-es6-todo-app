import React from 'react';
import Project from './project';
import LoadIndicator from '../loader';

var ProjectList = React.createClass({

  render() {
    var todoList = this.props.todo;
    var projects = todoList.map(function(project) {
      return <Project project={project} key={project.id} />
    });

    if (projects.length > 0) {
      return (
        <section className="list">
          {projects}
        </section>
      );
    } else {
      return (
        <LoadIndicator />
      );
    }
  }
});

export default ProjectList;

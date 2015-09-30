import React from 'react';
import Project from './Project.react';
import LoadIndicator from './LoadIndicator.react';

var ProjectList = React.createClass({

  render() {

    var projects = this.props.todo.map((project) => {
      return <Project project={project} key={project.id} />;
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

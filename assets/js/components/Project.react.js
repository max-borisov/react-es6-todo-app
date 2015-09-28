import React from 'react';
import ProjectHeader from './ProjectHeader.react';
import ProjectBar from './ProjectBar.react';
import ProjectTaskList from './TaskList.react';

var Project = React.createClass({

  render() {

    var project = this.props.project;

    return (
      <article>
        <ProjectHeader project={project} />
        <ProjectBar project={project} />
        <ProjectTaskList project={project} tasks={project.tasks} />
      </article>
    );
  }
});

export default Project;

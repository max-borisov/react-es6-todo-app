import React from 'react';
import ProjectHeader from './header';
import ProjectBar from './bar';
import ProjectTaskList from '../task/list';

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

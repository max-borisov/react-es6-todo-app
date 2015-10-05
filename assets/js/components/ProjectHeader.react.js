import React from 'react';
import * as dispatcher from '../flux/Dispatcher';
import Actions from '../flux/Actions';

var ProjectHeader = React.createClass({

  getInitialState() {
    return {
      editMode: false,
      title: this.props.project.title
    };
  },

  getProject() {
    return this.props.project;
  },

  onDeleteProject(event) {
    event.preventDefault();
    if (confirm('Are you sure ?')) {
      let projectId = this.getProject().id;
      dispatcher.emit(Actions.DELETE_PROJECT, { projectId });
    }
  },

  onEditProject(event) {
    event.preventDefault();
    this.setState({ editMode: !this.state.editMode }, () => {
      if (this.state.editMode === true) {
        React.findDOMNode(this.refs.input).focus();
      }
    });
  },

  onEditTitle(event) {
    if (event.keyCode === 13) {
      this.setState({
        editMode: false,
        title: event.target.value
      }, () => {
        let projectId = this.getProject().id;
        let title = this.state.title;
        dispatcher.emit(Actions.EDIT_PROJECT_REQUEST, { projectId, title });
      });
    }
  },

  render() {

    var editModeClass = this.state.editMode ? ' edit-mode' : '';
    return (
      <div className={'todo-header' + editModeClass}>
        <h3>{this.state.title}</h3>
        <ul>
          <li>
            <a className='todo-action-edit' href='#' title='Edit' onClick={this.onEditProject}>Edit</a>
          </li>
          <li>
            <a className='todo-action-remove' href='#' title='Delete' onClick={this.onDeleteProject}>Delete</a>
          </li>
        </ul>
        <input ref='input' name='' type='text' defaultValue={this.state.title} onKeyDown={this.onEditTitle} />
      </div>
    );
  }
});

export default ProjectHeader;

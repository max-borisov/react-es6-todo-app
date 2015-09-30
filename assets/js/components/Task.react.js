import React from 'react';
import Routes from '../lib/Routes';
import * as dispatcher from '../flux/Dispatcher';
import * as Actions from '../flux/Actions';

var Task = React.createClass({

  getInitialState() {

    return {
      editMode: false,
      description: this.props.task.description
    };
  },

  getProject() {
    return this.props.project;
  },

  getTask() {
    return this.props.task;
  },

  onDeleteTask(event) {
    event.preventDefault();

    if (confirm('Are you sure ?')) {
      let projectId = this.getProject().id;
      let taskId = this.getTask().id;
      dispatcher.emit(Actions.DELETE_TASK_DOM, { projectId, taskId });
    }
  },

  onCompleteTask(event) {
    let projectId = this.getProject().id;
    let taskId = this.getTask().id;
    let isComplete = event.target.checked;
    dispatcher.emit(Actions.COMPLETE_TASK, { projectId, taskId, isComplete });
  },

  onEditTask(event) {
    event.preventDefault();
    this.setState({ editMode: !this.state.editMode }, () => {
      if (this.state.editMode === true) {
        React.findDOMNode(this.refs.input).focus();
      }
    });
  },

  onEditDescription(event) {
    let description = event.target.value;
    if (event.keyCode === 13) {
      this.setState({
        editMode: false,
        description: description
      }, () => {
        let projectId = this.getProject().id;
        let taskId = this.getTask().id;
        dispatcher.emit(Actions.EDIT_TASK, { projectId, taskId, description });
      });
    }
  },

  render() {
    var completed = this.getTask().completed === true ? true : false;
    var editModeClass = this.state.editMode ? ' edit-mode' : '';

    return (

      <tr className='completed-task'>
        <td className='todo-list-checkbox'>
          <input defaultChecked={completed} type='checkbox' onChange={this.onCompleteTask} />
        </td>
        <td className='todo-list-divider'>&nbsp;</td>
        <td className={'todo-list-task' + editModeClass}>
          <p>{this.state.description}</p>
          <input ref='input' type="text" defaultValue={this.state.description} onKeyDown={this.onEditDescription} />
        </td>
        <td className='todo-list-actions'>
          <ul className='hidden'>
            <li>
              <a className='todo-list-task-edit' href='#' onClick={this.onEditTask}>Edit</a>
            </li>
            <li>
              <a className='todo-list-task-delete' href='#' onClick={this.onDeleteTask}>Delete</a>
            </li>
          </ul>
        </td>
      </tr>
    );
  }
});

export default Task;

import React from 'react';
import TodoAction from '../../todoAction';
import Routes from '../../routes';

var Task = React.createClass({

  getInitialState() {

    return {
      editMode: false,
      description: this.props.task.description,
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
      TodoAction.deleteTask(this.props.project, this.getTask());
    }
  },

  onCompleteTask(event) {
    var project = this.getProject();
    var task = this.getTask();
    var complete = event.target.checked;
    TodoAction.completeTask(project, task, complete);
  },

  onEditTask(event) {
    event.preventDefault();
    this.setState({ editMode: !this.state.editMode }, function() {
      if (this.state.editMode === true) {
        React.findDOMNode(this.refs.input).focus();
      }
    });
  },

  onEditDescription(event) {
    var description = event.target.value;
    if (event.keyCode === 13) {
      this.setState({
        editMode: false,
        description: description,
      }, function() {
        var project = this.getProject();
        var task = this.getTask();
        TodoAction.editTask(project, task, description);
      });
    }
  },

  render() {

    var task = this.getTask();
    var completed = task.completed === true ? true : false;
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

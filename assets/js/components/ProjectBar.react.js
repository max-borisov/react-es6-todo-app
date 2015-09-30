import React from 'react';
import * as dispatcher from '../flux/Dispatcher';
import Actions from '../flux/Actions';

var ProjectBar = React.createClass({

  onCreateTask(event) {
    event.preventDefault();
    let projectId = this.props.project.id;
    let taskInput = React.findDOMNode(this.refs.description);
    dispatcher.emit(Actions.CREATE_TASK, { projectId, taskInput });
  },

  render() {

    return (
      <div className='todo-bar'>
        <div className='todo-bar-new'>
          <form onSubmit={this.onCreateTask}>
            <input ref='description' name='' placeholder='Start typing here to create a task...' type='text'>
              <button>Add Task</button>
            </input>
          </form>
        </div>
      </div>
    );
  }
});

export default ProjectBar;

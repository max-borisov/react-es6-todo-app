import React from 'react';
import TodoAction from '../todoAction';

var TodoButton = React.createClass({

  onCreateProject(event) {
    event.preventDefault();
    TodoAction.createProject();
  },

  render() {

    return (
      <div className='new-todo'>
        <form className="button_to" onSubmit={this.onCreateProject}>
          <input type="submit" value="Add TODO List" />
        </form>
      </div>
    );
  }
});

export default TodoButton;
import React from 'react';
import * as dispatcher from '../flux/Dispatcher';
import Actions from '../flux/Actions';

var TodoButton = React.createClass({

  onCreateProject(event) {
    event.preventDefault();
    dispatcher.emit(Actions.CREATE_PROJECT);
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

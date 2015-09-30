import React from 'react';
import ProjectList from './ProjectList.react';
import TodoButton from './TodoButton.react';

var AppContent = React.createClass({

  render() {

    return (
      <div className="content">
        <ProjectList todo={this.props.todo} />
        <TodoButton />
      </div>
    );
  }
});

export default AppContent;

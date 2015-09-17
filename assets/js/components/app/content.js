import React from 'react';
import ProjectList from '../project/list';
import TodoButton from '../button';

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

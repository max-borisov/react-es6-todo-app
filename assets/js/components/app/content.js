var React = require('react');
var ProjectList = require('../project/list');
var TodoButton = require('../button');

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

module.exports = AppContent;

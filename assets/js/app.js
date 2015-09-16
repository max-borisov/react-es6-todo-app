import React from 'react';
import AppHeader from './components/app/header';
import AppContent from './components/app/content';
import TodoStore from './todoStore';

var TodoApp = React.createClass({

  getInitialState() {
    return this.getStateFromStore();
  },

  getStateFromStore() {
    return TodoStore.getState();
  },

  componentDidMount() {
    TodoStore.onChange = this.onChange;
    TodoStore.loadProject();
  },

  onChange() {
    this.setState(this.getStateFromStore());
  },

  render() {

    return (
      <div className='main'>
        <AppHeader />
        <AppContent todo={this.state.todo} />
      </div>
    );
  }
});

React.render(<TodoApp />, document.getElementById('container'));

import React from 'react';
import AppHeader from './components/AppHeader.react';
import AppContent from './components/AppContent.react';
import Store from './flux/Store';

var store = Store.instance;
var TodoApp = React.createClass({

  getInitialState() {
    return this.getStateFromStore();
  },

  getStateFromStore() {
    return store.getState();
  },

  componentDidMount() {
    store.loadProject();
    store.addChangeListener(this.onChange);
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

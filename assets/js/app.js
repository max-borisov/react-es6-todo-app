import React from 'react';
import AppHeader from './components/AppHeader.react';
import AppContent from './components/AppContent.react';
import store from './flux/Store';

// Singleton | new Store
// $ vs fetch
// WebRequest + Todo manupilation
// map()
// use map() more effectively
// immutable js

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

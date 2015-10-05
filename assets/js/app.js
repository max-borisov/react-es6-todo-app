import React from 'react';
import AppHeader from './components/AppHeader.react';
import AppContent from './components/AppContent.react';
import Actions from './flux/Actions';
import * as dispatcher from './flux/Dispatcher';
import store from './flux/Store';
import WebRequest from './lib/WebRequest';

var TodoApp = React.createClass({

  getInitialState() {
    return this.getStateFromStore();
  },

  getStateFromStore() {
    return store.getState();
  },

  componentDidMount() {
    dispatcher.emit(Actions.LOAD_PROJECTS_REQUEST, {});
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

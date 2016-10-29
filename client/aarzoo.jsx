import { applyMiddleware, compose, createStore } from 'redux';
import aarzooReducers from './aarzooReducers';
import App from './App.jsx';
import { receivedWishlists } from './actions';
var React = require('react');
var ReactDOM = require('react-dom');

var mountPoint = document.getElementById('content');
var myCss = require('./aarzoo.css');

const store = createStore(
  aarzooReducers,
  compose(
    applyMiddleware(
      ({dispatch}) => next => action => {
        if (action && typeof action.then === 'function') {
          action.then((realAction) => dispatch(realAction))
        } else {
          next(action);
        }
      }
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
store.subscribe(renderApp);

function renderApp() {
  ReactDOM.render(
    <App store={store}/>,
    mountPoint
  );
}

function fetchWishlists() {
  fetch('http://localhost:3000/allWishlists')
    .then(response => response.json())
    .then(json => {
      store.dispatch(receivedWishlists(json));
    });
}

renderApp();
fetchWishlists();

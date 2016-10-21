var React = require('react');
var ReactDOM = require('react-dom');
var mountPoint = document.getElementById('content');
var myCss = require('./aarzoo.css');

ReactDOM.render(
  <div style={{border: '1px solid red'}}>Hello World</div>,
  mountPoint
);

//create store
//register reducers and middleware and however complex you wanna get
//ReactDOM.render(<YourTopLevelComponent>, mountPoint);

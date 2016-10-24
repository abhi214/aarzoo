import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const ViewWishlists = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func
  },
  onClick() {
    this.props.dispatch({});
  },
  render() {
    return (<RaisedButton label="View Wishlists" style={style} onClick={this.onClick} />);
  }
});

export default ViewWishlists;

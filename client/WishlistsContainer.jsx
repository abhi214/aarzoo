import React from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import CardGiftcard from 'material-ui/svg-icons/action/card-giftcard';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { wishlistSelected } from './actions';

const paperStyle = {
  height: 150,
  width: 250,
  margin: 20,
  textAlign: 'center',
  verticalAlign: 'top',
  display: 'inline-block',
};

const appBarStyle = {
  title: {
    cursor: 'pointer'
  },
};

const wishlistsContainerStyle = {
  textAlign: 'center'
}

const createWishlistStyle = {
  marginTop: 20
};

const WishlistsContainer = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func,
    wishlists: React.PropTypes.array
  },

  onClick() {
    this.props.dispatch(wishlistSelected(1));
  },

  render() {
    return (
      <div style={wishlistsContainerStyle}>
        <AppBar
          title={<span style={appBarStyle.title}>Wishlists</span>}
          iconElementLeft={<IconButton><CardGiftcard /></IconButton>}
        />
        <div style={wishlistsContainerStyle}>
          <Paper style={paperStyle} onClick={this.onClick} zDepth={4}><h1>Hello</h1></Paper>
          <Paper style={paperStyle} onClick={this.onClick} zDepth={4}><h1>Hello</h1></Paper>
          <Paper style={paperStyle} onClick={this.onClick} zDepth={4}><h1>Hello</h1></Paper>
          <Paper style={paperStyle} onClick={this.onClick} zDepth={4}><h1>Hello</h1></Paper>
        </div>
        <FloatingActionButton style={createWishlistStyle}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
});

export default WishlistsContainer;

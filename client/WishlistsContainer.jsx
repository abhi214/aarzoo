import React from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import CardGiftcard from 'material-ui/svg-icons/action/card-giftcard';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import WishlistCreator from './WishlistCreator';

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
  textAlign: 'start'
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
  getInitialState() {
    return {
      showCreateDialog: false
    }
  },
  onWishlistSelect(wishlistId) {
    this.props.dispatch(wishlistSelected(wishlistId));
  },
  onOpenCreateDialog() {
    this.showDialog(true);
  },
  showDialog(showDialog) {
    this.setState({showCreateDialog: showDialog});
  },
  renderWishlistPaper(wishlist, index) {
    const { id, name } = wishlist;
    return (
      <Paper key={`wishlist_${index}`} style={paperStyle} onClick={() => this.onWishlistSelect(id)} zDepth={4}>
        <h1>{name}</h1>
      </Paper>
    );
  },
  render() {
    const { dispatch, wishlists } = this.props;
    const wishlistPapers = wishlists.map((wishlist, index) => {
      return this.renderWishlistPaper(wishlist, index);
    });
    return (
      <div style={wishlistsContainerStyle}>
        <AppBar
          style={appBarStyle}
          title={<span>Wishlists</span>}
          iconElementLeft={<IconButton><CardGiftcard /></IconButton>}
        />
        <div style={wishlistsContainerStyle}>{wishlistPapers}</div>
        <FloatingActionButton
          onClick={this.onOpenCreateDialog}
          style={createWishlistStyle}>
          <ContentAdd />
        </FloatingActionButton>
        <WishlistCreator
          dispatch={dispatch}
          showDialog={this.state.showCreateDialog}
          showDialogCallback={this.showDialog} />
      </div>
    );
  }
});

export default WishlistsContainer;

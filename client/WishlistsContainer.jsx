import React from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import CardGiftcard from 'material-ui/svg-icons/action/card-giftcard';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Delete from 'material-ui/svg-icons/action/delete';
import WishlistCreator from './WishlistCreator';

import { wishlistSelected, wishlistDeleted } from './actions';

const paperStyle = {
  height: 150,
  width: 250,
  margin: 20,
  textAlign: 'center',
  verticalAlign: 'top',
  display: 'inline-block',
};
const appBarStyle = { textAlign: 'start' };
const wishlistsContainerStyle = { textAlign: 'center' };
const createWishlistStyle = { marginTop: 20 };
const deleteButtonStyle = { height: 33, width: 33 };
const deleteIconStyle = { height: 33, width: 33, color: '#878c84', fill: '#878c84' };

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
  onDeleteWishlist(event, wishlist) {
    event.stopPropagation();
    this.props.dispatch(wishlistDeleted(wishlist));
  },
  showDialog(showDialog) {
    this.setState({showCreateDialog: showDialog});
  },
  renderWishlistPaper(wishlist, index) {
    const { id, name } = wishlist;
    return (
      <Paper key={`wishlist_${index}`} style={paperStyle} onClick={() => this.onWishlistSelect(id)} zDepth={4}>
        <h1>{name}</h1>
        <FlatButton
          style={deleteButtonStyle}
          onClick={(event) => this.onDeleteWishlist(event, wishlist)}
          icon={<Delete style={deleteIconStyle} />}
        />
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

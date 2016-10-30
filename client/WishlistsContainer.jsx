import React from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import CardGiftcard from 'material-ui/svg-icons/action/card-giftcard';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import Create from 'material-ui/svg-icons/content/create';
import Delete from 'material-ui/svg-icons/action/delete';
import WishlistCreator from './WishlistCreator';

import { wishlistSelected, wishlistDeleted, wishlistSelectedToEdit } from './actions';

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
const paperButtonStyle = { height: 33, width: 33, minWidth: 0 };
const iconStyle = { height: 33, width: 33, color: '#878c84', fill: '#878c84' };

const WishlistsContainer = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func,
    wishlists: React.PropTypes.array,
    selectedWishlist: React.PropTypes.object
  },
  getInitialState() {
    return {
      showWishlistDialog: false
    }
  },
  onOpenWishDialog_NewWishlist() {
    this.toggleWishDialogAndResetSelectedWishlist(true);
  },
  onHideWishDialog() {
    this.toggleWishDialogAndResetSelectedWishlist(false);
  },
  toggleWishDialogAndResetSelectedWishlist(showDialog) {
    this.showDialog(showDialog, {
      id: undefined,
      name: ''
    });
  },
  onOpenWishDialog_ExistingWishlist(event, wishlist) {
    event.stopPropagation();
    this.showDialog(true, Object.assign({}, wishlist));
  },
  showDialog(showDialog, selectedWishlist) {
    const { dispatch } = this.props;
    this.props.dispatch(wishlistSelectedToEdit(selectedWishlist));
    this.setState({showWishlistDialog: showDialog});
  },
  onWishlistSelect(wishlistId) {
    this.props.dispatch(wishlistSelected(wishlistId));
  },
  onDeleteWishlist(event, wishlist) {
    event.stopPropagation();
    this.props.dispatch(wishlistDeleted(wishlist));
  },
  renderWishlistPaper(wishlist, index) {
    const { id, name } = wishlist;
    return (
      <Paper key={`wishlist_${index}`} style={paperStyle} onClick={() => this.onWishlistSelect(id)} zDepth={4}>
        <h1>{name}</h1>
        <div>
        <FlatButton
          style={paperButtonStyle}
          onClick={(event) => this.onOpenWishDialog_ExistingWishlist(event, wishlist)}
          icon={<Create style={iconStyle} />}
        />
        <FlatButton
          style={paperButtonStyle}
          onClick={(event) => this.onDeleteWishlist(event, wishlist)}
          icon={<Delete style={iconStyle} />}
        />
        </div>
      </Paper>
    );
  },
  render() {
    const { dispatch, wishlists, selectedWishlist } = this.props;
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
          onClick={this.onOpenWishDialog_NewWishlist}
          style={createWishlistStyle}>
          <ContentAdd />
        </FloatingActionButton>
        <WishlistCreator
          dispatch={dispatch}
          showDialog={this.state.showWishlistDialog}
          hideDialog={this.onHideWishDialog}
          selectedWishlist={selectedWishlist} />
      </div>
    );
  }
});

export default WishlistsContainer;

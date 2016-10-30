import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { wishlistCreated, wishlistUpdated, editSelectedWishlist } from './actions';

const WishlistCreator = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func,
    showDialog: React.PropTypes.bool,
    hideDialog: React.PropTypes.func,
    selectedWishlist: React.PropTypes.object
  },
  upsertNewWishlist() {
    const { dispatch, selectedWishlist, hideDialog } = this.props;
    if(selectedWishlist.id) {
      dispatch(wishlistUpdated(selectedWishlist));
    } else {
      dispatch(wishlistCreated(selectedWishlist));
    }
    hideDialog();
  },
  onTextChange(event, property) {
    const action = editSelectedWishlist(property, event.target.value);
    this.props.dispatch(action);
  },
  render() {
    const { showDialog, hideDialog, selectedWishlist } = this.props;
    const dialogActions = [
      <FlatButton label="Cancel" primary={true} onClick={hideDialog} />,
      <FlatButton label="Create" primary={true} onClick={this.upsertNewWishlist} />
    ];
    return (
      <Dialog title="Create New Wishlist" actions={dialogActions} modal={false}
        open={showDialog} onRequestClose={hideDialog}>
        <TextField
          hintText="Name Your New Wishlist"
          value={selectedWishlist.name}
          onChange={(event) => this.onTextChange(event, 'name')} />
      </Dialog>
    );
  }
});

export default WishlistCreator;

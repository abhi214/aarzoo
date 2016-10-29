import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { wishlistCreated } from './actions';

const WishlistCreator = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func,
    showDialog: React.PropTypes.bool,
    showDialogCallback: React.PropTypes.func
  },
  getInitialState() {
    return {
      wishlistName: ''
    }
  },
  onHideCreateDialog() {
    this.props.showDialogCallback(false);
  },
  createNewWishlist() {
    const { showDialogCallback, dispatch } = this.props;
    dispatch(wishlistCreated(this.state.wishlistName));
    showDialogCallback(false);
  },
  onTextChange(event) {
    this.setState({wishlistName: event.target.value});
  },
  render() {
    const { showDialog, showDialogCallback } = this.props;
    const dialogActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.onHideCreateDialog}
      />,
      <FlatButton
        label="Create"
        primary={true}
        keyboardFocused={true}
        onClick={this.createNewWishlist}
      />
    ];
    return (
      <Dialog
        title="Create New Wishlist"
        actions={dialogActions}
        modal={false}
        open={showDialog}
        onRequestClose={this.onHideCreateDialog}>
        <TextField
          hintText="Name Your New Wishlist"
          onBlur={this.onTextChange}/>
      </Dialog>
    );
  }
});

export default WishlistCreator;

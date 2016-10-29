import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { wishCreated, wishUpdated } from './actions';

const EMPTY_WISH = {
  item: '',
  description: '',
  price: '',
  link: ''
};

const WishCreator = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func,
    showDialog: React.PropTypes.bool,
    showDialogCallback: React.PropTypes.func,
    wishlist_id: React.PropTypes.number,
    currNumWishes: React.PropTypes.number,
    existingWish: React.PropTypes.object,
    existingWishCallback: React.PropTypes.func
  },
  getInitialState() {
    const { currNumWishes, wishlist_id } = this.props;
    return Object.assign({}, EMPTY_WISH, {
      priority: currNumWishes + 1,
      wishlist_id: wishlist_id
    });
  },
  onHideCreateDialog() {
    this.props.showDialogCallback(false);
    this.setState(Object.assign({}, EMPTY_WISH, {
      priority: currNumWishes + 1,
      wishlist_id: wishlist_id
    }));
  },
  upsertNewWish() {
    const { showDialogCallback, dispatch, existingWish, currNumWishes, wishlist_id } = this.props;
    if(existingWish) {
      dispatch(wishUpdated(existingWish));
    } else {
      dispatch(wishCreated(this.state));
      this.setState(Object.assign({}, EMPTY_WISH, {
        priority: currNumWishes + 2,
        wishlist_id: wishlist_id
      }));
    }
    showDialogCallback(false);
  },
  onTextChange(event, property) {
    const { existingWish, existingWishCallback } = this.props;
    if(existingWish) {
      existingWishCallback(property, event.target.value);
    } else {
      let newState = Object.assign({}, this.state);
      newState[property] = event.target.value;
      this.setState(newState);
    }
  },
  render() {
    const { showDialog, showDialogCallback, existingWish } = this.props;
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
        onClick={this.upsertNewWish}
      />
    ];
    return (
      <Dialog
        title="Add a wish"
        actions={dialogActions}
        modal={false}
        open={showDialog}
        onRequestClose={this.onHideCreateDialog}>
        <div>
          <TextField
            hintText="Item"
            value={existingWish ? existingWish.item : this.state.item}
            onChange={(event) => this.onTextChange(event, 'item')}/>
          <br/>
          <TextField
            hintText="Description"
            value={existingWish ? existingWish.description : this.state.description}
            onChange={(event) => this.onTextChange(event, 'description')}/>
          <br/>
          <TextField
            hintText="Link"
            value={existingWish ? existingWish.link : this.state.link}
            onChange={(event) => this.onTextChange(event, 'link')}/>
          <br/>
          <TextField
            hintText="Price"
            value={existingWish ? existingWish.price : this.state.price}
            onChange={(event) => this.onTextChange(event, 'price')}/>
          <br/>
        </div>
      </Dialog>
    );
  }
});

export default WishCreator;

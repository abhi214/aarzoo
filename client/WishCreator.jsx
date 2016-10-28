import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { createWish, updateWish } from './actions';

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
    return {
      id: undefined,
      item: '',
      description: '',
      price: '',
      link: '',
      priority: currNumWishes + 1,
      wishlist_id: wishlist_id
    }
  },
  /*componentWillReceiveProps(nextProps) {
    const { existingWish } = nextProps;
    if(!this.props.existingWish && existingWish) {
      this.setState(existingWish);
    }
  },*/
  onHideCreateDialog() {
    this.props.showDialogCallback(false);
  },
  upsertNewWish() {
    const { showDialogCallback, dispatch, existingWish } = this.props;
    if(existingWish) {
      dispatch(updateWish(existingWish));
    } else {
      dispatch(createWish(this.state));
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

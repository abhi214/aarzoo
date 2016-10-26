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
    existingWish: React.PropTypes.object
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
  componentWillReceiveProps(nextProps) {
    const { existingWish } = nextProps;
    if(!this.props.existingWish && existingWish) {
      this.setState(existingWish);
    }
  },
  onHideCreateDialog() {
    this.props.showDialogCallback(false);
  },
  upsertNewWish() {
    const { showDialogCallback, dispatch } = this.props;
    if(!this.state.id) {
      dispatch(createWish(Object.assign({}, this.state)));
    } else {
      dispatch(updateWish(Object.assign({}, this.state)));
    }
    showDialogCallback(false);
  },
  onTextChange(event, property) {
    let newState = Object.assign({}, this.state);
    newState[property] = event.target.value;
    this.setState(newState);
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
          <TextField hintText="Item" onBlur={(event) => this.onTextChange(event, 'item')}/><br/>
          <TextField hintText="Description" onBlur={(event) => this.onTextChange(event, 'description')}/><br/>
          <TextField hintText="Link" onBlur={(event) => this.onTextChange(event, 'link')}/><br/>
          <TextField hintText="Price" onBlur={(event) => this.onTextChange(event, 'price')}/><br/>
        </div>
      </Dialog>
    );
  }
});

export default WishCreator;

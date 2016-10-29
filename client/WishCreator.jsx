import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { wishCreated, wishUpdated, editSelectedWish } from './actions';

const WishCreator = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func,
    showDialog: React.PropTypes.bool,
    hideDialog: React.PropTypes.func,
    selectedWish: React.PropTypes.object
  },
  upsertNewWish() {
    const { dispatch, selectedWish, hideDialog } = this.props;
    if(selectedWish.id) {
      dispatch(wishUpdated(selectedWish));
    } else {
      dispatch(wishCreated(selectedWish));
    }
    hideDialog();
  },
  onTextChange(event, property) {
    const action = editSelectedWish(property, event.target.value);
    this.props.dispatch(action);
  },
  render() {
    const { showDialog, hideDialog, selectedWish } = this.props;
    const dialogActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={hideDialog}
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
        onRequestClose={hideDialog}>
        <div>
          <TextField
            hintText="Item"
            value={selectedWish.item}
            onBlur={(event) => this.onTextChange(event, 'item')}/>
          <br/>
          <TextField
            hintText="Description"
            value={selectedWish.description}
            onBlur={(event) => this.onTextChange(event, 'description')}/>
          <br/>
          <TextField
            hintText="Link"
            value={selectedWish.link}
            onBlur={(event) => this.onTextChange(event, 'link')}/>
          <br/>
          <TextField
            hintText="Price"
            value={selectedWish.price}
            onBlur={(event) => this.onTextChange(event, 'price')}/>
          <br/>
        </div>
      </Dialog>
    );
  }
});

export default WishCreator;

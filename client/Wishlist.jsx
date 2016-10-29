import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';

//import MobileTearSheet from '../../../MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
import Create from 'material-ui/svg-icons/content/create';
import Delete from 'material-ui/svg-icons/action/delete';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import {pink200} from 'material-ui/styles/colors';

import WishCreator from './WishCreator';
import { wishlistUnselected, wishDeleted, wishSelectedToEdit } from './actions';

const appBarStyle = { title: { cursor: 'pointer' } };
const addWishlistContainerStyle = { textAlign: 'right' };
const addWishlistStyle = { marginTop: 20 };

const Wishlist = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func,
    wishlist: React.PropTypes.object,
    selectedWish: React.PropTypes.object
  },
  getInitialState() {
    return {
      showWishDialog: false
    }
  },
  onReturnToWishlists() {
    this.props.dispatch(wishlistUnselected());
  },
  onOpenWishDialog_NewWish() {
    this.toggleWishDialogAndResetSelectedWish(true);
  },
  onHideWishDialog() {
    this.toggleWishDialogAndResetSelectedWish(false);
  },
  toggleWishDialogAndResetSelectedWish(showDialog) {
    const { id, items } = this.props.wishlist;
    this.showDialog(showDialog, {
      item: '',
      description: '',
      link: '',
      price: '',
      priority: items.length + 1,
      wishlist_id: id
    });
  },
  onOpenWishDialog_ExistingWish(event, wish) {
    event.stopPropagation();
    this.showDialog(true, Object.assign({}, wish));
  },
  showDialog(showDialog, selectedWish) {
    const { dispatch } = this.props;
    this.props.dispatch(wishSelectedToEdit(selectedWish));
    this.setState({showWishDialog: showDialog});
  },
  onDeleteWish(event, wish) {
    event.stopPropagation();
    this.props.dispatch(wishDeleted(wish));
  },
  modifySelectedWish(property, value) {
    let newState = Object.assign({}, this.state);
    newState.selectedWish[property] = value;
    this.setState(newState);
  },
  safeOpen(link) {
    const openedWindow = window.open(link);
    if (openedWindow) {
      openedWindow.opener = null;
      openedWindow.location = link;
    }
  },
  renderWish(wish, index) {
    const { item, description, link, price } = wish;
    return (
      <ListItem
        key={`wish_${index}`}
        leftIcon={<ActionGrade color={pink200} />}
        onClick={()=>this.safeOpen(link)}
        rightIconButton={
          <div>
            <IconButton onClick={(event) => this.onOpenWishDialog_ExistingWish(event, wish)}>
              <Create />
            </IconButton>
            <IconButton onClick={(event) => this.onDeleteWish(event, wish)}>
              <Delete />
            </IconButton>
          </div>
        }
        primaryText={item}
        secondaryText={`Price: \$${price} | ${description}`}
        secondaryTextLines={2}
      />
    );
  },
  render() {
    const { wishlist, dispatch, selectedWish } = this.props;
    const { id, name, items } = wishlist;
    const wishes = items.map((item, index) => {
      return this.renderWish(item, index);
    });
    return (
      <div>
        <AppBar
          title={<span style={appBarStyle.title}>{name}</span>}
          iconElementLeft={
            <IconButton onClick={this.onReturnToWishlists}>
              <NavigationClose />
            </IconButton>
          }
        />
        <div>
          <List>{wishes}</List>
        </div>
        <div style={addWishlistContainerStyle}>
          <FloatingActionButton
            onClick={this.onOpenWishDialog_NewWish}
            style={addWishlistStyle}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
        <WishCreator
          dispatch={dispatch}
          showDialog={this.state.showWishDialog}
          hideDialog={this.onHideWishDialog}
          selectedWish={selectedWish} />
      </div>
    );
  }
});

export default Wishlist;

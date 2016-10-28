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
import Avatar from 'material-ui/Avatar';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import {pink200} from 'material-ui/styles/colors';

import WishCreator from './WishCreator';
import { unselectWishlist } from './actions';

const appBarStyle = {
  title: {
    cursor: 'pointer'
  },
};
const addWishlistContainerStyle = {
  textAlign: 'right'
}
const addWishlistStyle = {
  marginTop: 20
};

const Wishlist = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func,
    wishlist: React.PropTypes.object
  },
  getInitialState() {
    return {
      showCreateWishDialog: false,
      selectedWish: undefined
    }
  },
  onReturnToWishlists() {
    this.props.dispatch(unselectWishlist());
  },
  onOpenCreateWishDialog() {
    this.showDialog(true);
  },
  onOpenEditWishDialog(event, wish) {
    event.stopPropagation();
    this.setState({
      showCreateWishDialog: true,
      selectedWish: Object.assign({}, wish)
    });
  },
  showDialog(showDialog) {
    this.setState({showCreateWishDialog: showDialog, selectedWish: undefined});
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
          <IconButton onClick={(event) => this.onOpenEditWishDialog(event, wish)}>
            <Create />
          </IconButton>
        }
        primaryText={item}
        secondaryText={`Price: \$${price} | ${description}`}
        secondaryTextLines={2}
      />
    );
  },
  render() {
    const { wishlist, dispatch } = this.props;
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
            onClick={this.onOpenCreateWishDialog}
            style={addWishlistStyle}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
        <WishCreator
          dispatch={dispatch}
          showDialog={this.state.showCreateWishDialog}
          showDialogCallback={this.showDialog}
          wishlist_id={id}
          currNumWishes={items.length}
          existingWish={this.state.selectedWish}
          existingWishCallback={this.modifySelectedWish} />
      </div>
    );
  }
});

export default Wishlist;

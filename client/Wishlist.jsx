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

const wishlistsContainerStyle = {
  textAlign: 'center'
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
      showCreateWishDialog: false
    }
  },
  onReturnToWishlists() {
    this.props.dispatch(unselectWishlist());
  },
  onOpenCreateWishDialog() {
    this.showDialog(true);
  },
  showDialog(showDialog) {
    this.setState({showCreateWishDialog: showDialog});
  },
  renderWish(wish) {
    const { item, description, price } = wish;
    return (
      <ListItem
        leftIcon={<ActionGrade color={pink200} />}
        rightIcon={<Create />}
        primaryText={item}
        secondaryText={`Price: \$${price} | ${description}`}
        secondaryTextLines={2}
      />
    );
  },
  render() {
    const { wishlist, dispatch } = this.props;
    const { id, name, items } = wishlist;
    const wishes = items.map((item) => {
      return this.renderWish(item);
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
        <FloatingActionButton
          onClick={this.onOpenCreateWishDialog}
          style={addWishlistStyle}>
          <ContentAdd />
        </FloatingActionButton>
        <WishCreator
          dispatch={dispatch}
          showDialog={this.state.showCreateWishDialog}
          showDialogCallback={this.showDialog}
          wishlist_id={id}
          currNumWishes={items.length} />
      </div>
    );
  }
});

export default Wishlist;

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
  onReturnToWishlists() {
    this.props.dispatch(unselectWishlist());
  },
  render() {
    const { name, items } = this.props.wishlist;
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
          iconElementRight={<FlatButton label="Save" />}
        />
        <div>
          <List>{wishes}</List>
        </div>
        <FloatingActionButton style={addWishlistStyle}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
});

export default Wishlist;

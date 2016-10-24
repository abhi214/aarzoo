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
import {yellow600} from 'material-ui/styles/colors';


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
  },
  render() {
    return (
      <div>
        <AppBar
          title={<span style={appBarStyle.title}>My Wishlist</span>}
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          iconElementRight={<FlatButton label="Save" />}
        />
        <div>
          <List>
            <ListItem
              leftIcon={<ActionGrade color={yellow600} />}
              rightIcon={<Create />}
              primaryText="Wish One"
              secondaryText="Price: $29.99 | Wish Description"
              secondaryTextLines={2}
            />
            <ListItem
              leftIcon={<ActionGrade color={yellow600} />}
              rightIcon={<Create />}
              primaryText="Wish Two"
              secondaryText="Price: $50.99 | Wish Description"
            />
            <ListItem
              leftIcon={<ActionGrade color={yellow600} />}
              rightIcon={<Create />}
              primaryText="Wish Three"
              secondaryText="Price: $299.99 | Wish Description"
            />
          </List>
        </div>
        <FloatingActionButton style={addWishlistStyle}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
});

export default Wishlist;

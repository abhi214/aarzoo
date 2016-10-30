import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Wishlist from './Wishlist';
import WishlistsContainer from './WishlistsContainer';

const App = React.createClass({
  propTypes: {
    store: React.PropTypes.object.isRequired
  },
  getDefaultProps() {
    return {};
  },
  render() {
    const { store } = this.props;
    const { wishlists, activeWishlist, selectedWish} = store.getState();
    const view = activeWishlist ?
      <Wishlist dispatch={store.dispatch} wishlist={activeWishlist} selectedWish={selectedWish}/> :
      <WishlistsContainer dispatch={store.dispatch} wishlists={wishlists}/>;

    return (
      <MuiThemeProvider>{view}</MuiThemeProvider>
    );
  }
});

export default App;

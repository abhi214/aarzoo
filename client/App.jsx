import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ViewWishlists from './ViewWishlists';
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
    const { wishlists, activeWishlist} = store.getState();
    const view = activeWishlist ? <Wishlist wish={activeWishlist} /> :
      (wishlists && wishlists.length > 0) ? <WishlistsContainer dispatch={store.dispatch} wishlists={wishlists}/> :
      <ViewWishlists/>;
      return (
        <MuiThemeProvider>{view}</MuiThemeProvider>
      );
  }
});

export default App;

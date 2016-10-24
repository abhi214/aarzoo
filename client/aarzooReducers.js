import { combineReducers } from 'redux';
import { RECEIVED_WISHLISTS, WISHLIST_SELECTED } from './actions';

function wishlists(state = [], action) {
  switch (action.type) {
    case RECEIVED_WISHLISTS:
      return action.payload;
  }
  return state;
}

function wishes(state = false, action) {
  switch (action.type) {
    case WISHLIST_SELECTED:
      return action.payload;
  }
  return state;
}

const aarzooReducers = combineReducers({
  wishlists,
  activeWishlist: wishes
})

export default aarzooReducers;

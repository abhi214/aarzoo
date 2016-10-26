import { combineReducers } from 'redux';
import {
  RECEIVED_WISHLISTS,
  WISHLIST_SELECTED,
  UNSELECT_WISHLIST,
  CREATE_WISHLIST,
  CREATE_WISH
} from './actions';

function wishlists(state = [], action) {
  switch (action.type) {
    case RECEIVED_WISHLISTS:
      return action.payload;
    case CREATE_WISHLIST:
      return state.concat(action.payload);
  }
  return state;
}

function wishes(state = false, action) {
  switch (action.type) {
    case WISHLIST_SELECTED:
      return action.payload;
    case UNSELECT_WISHLIST:
      return false;
    case CREATE_WISH:
      return Object.assign({}, state, { items: state.items.concat(action.payload) });
  }
  return state;
}

const aarzooReducers = combineReducers({
  wishlists,
  activeWishlist: wishes
})

export default aarzooReducers;

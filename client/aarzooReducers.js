import { combineReducers } from 'redux';
import { RECEIVED_WISHLISTS, WISHLIST_SELECTED, UNSELECT_WISHLIST,
  CREATE_WISHLIST, WISHLIST_DELETED, CREATE_WISH, UPDATE_WISH, WISH_DELETED,
  WISH_SELECTED_TO_MODIFY, MODIFY_SELECTED_WISH } from './actions';

function wishlists(state = [], action) {
  switch (action.type) {
    case RECEIVED_WISHLISTS:
      return action.payload;
    case CREATE_WISHLIST:
      return state.concat(action.payload);
    case WISHLIST_DELETED:
      const index = state.indexOf(action.wishlist);
      if(index >= 0) {
        return state.slice(0, index).concat(state.slice(index + 1, state.length));
      }
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
    case UPDATE_WISH:
      if(!state) {
        return { items: [action.payload] };
      } else {
        let updatedItems = state.items.slice(0);
        const index = updatedItems.map((item) => item.id).indexOf(action.payload.id);
        updatedItems[index] = action.payload;
        return Object.assign({}, state, { items: updatedItems});
      }
    case WISH_DELETED:
      if(state) {
        const { items } = state;
        if(items) {
          const index = items.indexOf(action.wish);
          if(index >= 0) {
            const updatedItems = items.slice(0, index).concat(items.slice(index + 1, items.length));
            return Object.assign({}, state, { items: updatedItems});
          }
        }
      }
  }
  return state;
}

function selectedWish(state = false, action) {
  switch(action.type) {
    case WISH_SELECTED_TO_MODIFY:
      return action.payload;
    case MODIFY_SELECTED_WISH:
      let newState = Object.assign({}, state);
      newState[action.property] = action.value;
      return newState;
  }
  return state;
}

const aarzooReducers = combineReducers({
  wishlists,
  activeWishlist: wishes,
  selectedWish
})

export default aarzooReducers;

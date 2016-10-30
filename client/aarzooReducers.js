import { combineReducers } from 'redux';
import { RECEIVED_WISHLISTS, WISHLIST_CREATED, WISHLIST_UPDATED, WISHLIST_DELETED,
  WISHLIST_SELECTED, WISHLIST_UNSELECTED, WISHLIST_SELECTED_TO_EDIT,
  EDIT_SELECTED_WISHLIST, WISH_CREATED, WISH_UPDATED, WISH_DELETED,
  WISH_SELECTED_TO_EDIT, EDIT_SELECTED_WISH } from './actions';

function wishlists(state = [], action) {
  switch (action.type) {
    case RECEIVED_WISHLISTS:
      return action.payload;
    case WISHLIST_CREATED:
      return state.concat(action.payload);
    case WISHLIST_UPDATED:
      if(!state) {
        return [action.payload];
      } else {
        let updatedItems = state.slice(0);
        const index = updatedItems.map((item) => item.id).indexOf(action.payload.id);
        updatedItems[index] = action.payload;
        return updatedItems;
      }
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
    case WISHLIST_UNSELECTED:
      return false;
    case WISH_CREATED:
      return Object.assign({}, state, { items: state.items.concat(action.payload) });
    case WISH_UPDATED:
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

function selectedWish(state = {}, action) {
  switch(action.type) {
    case WISH_SELECTED_TO_EDIT:
      return action.payload;
    case EDIT_SELECTED_WISH:
      let newState = Object.assign({}, state);
      newState[action.property] = action.value;
      return newState;
  }
  return state;
}

function selectedWishlist(state = {}, action) {
  switch(action.type) {
    case WISHLIST_SELECTED_TO_EDIT:
      return action.payload;
    case EDIT_SELECTED_WISHLIST:
      let newState = Object.assign({}, state);
      newState[action.property] = action.value;
      return newState;
  }
  return state;
}

const aarzooReducers = combineReducers({
  wishlists,
  activeWishlist: wishes,
  selectedWish,
  selectedWishlist
})

export default aarzooReducers;

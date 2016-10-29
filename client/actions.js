
////////////////* WISHLIST ACTIONS *////////////////////

export const RECEIVED_WISHLISTS = 'RECEIVED_WISHLISTS';
export function receivedWishlists(wishlists) {
  return {
    type: RECEIVED_WISHLISTS,
    payload: wishlists
  };
}

export const WISHLIST_SELECTED = 'WISHLIST_SELECTED';
export function wishlistSelected(wishlistId) {
  return fetch(`http://localhost:3000/wishlist/${wishlistId}`)
    .then(response => response.json())
    .then(json => {
      return {
        type: WISHLIST_SELECTED,
        payload: Object.assign(json, {id: wishlistId})
      }
    });
}

export const UNSELECT_WISHLIST = 'UNSELECT_WISHLIST';
export function unselectWishlist() {
  return { type: UNSELECT_WISHLIST };
}

export const WISHLIST_DELETED = 'WISHLIST_DELETED';
export function wishlistDeleted(wishlist) {
  const { id } = wishlist;
  return fetch(`http://localhost:3000/destroyWishlist/${id}`,
    { method: 'POST' }
  ).then(response => response.json())
    .then(json => {
      return {
        type: WISHLIST_DELETED,
        wishlist: wishlist
      }
    });
}

export const CREATE_WISHLIST = 'CREATE_WISHLIST';
export function createWishlist(wishlistName) {
  return fetch(`http://localhost:3000/createWishlist/${wishlistName}`,
    { method: 'POST' }
  ).then(response => response.json())
    .then(json => {
      return {
        type: CREATE_WISHLIST,
        payload: {
          id: json,
          name: wishlistName
        }
      }
    });
}

////////////////* WISH ACTIONS *////////////////////

export const CREATE_WISH = 'CREATE_WISH';
export function createWish(wish) {
  const reqBodyData = JSON.stringify(wish);
  return fetch(`http://localhost:3000/addWishlistItem`,
    {
      method: 'POST',
      body: reqBodyData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  ).then(response => response.json())
    .then(json => {
      return {
        type: CREATE_WISH,
        payload: Object.assign({}, wish, { id: json })
      }
    });
}

export const UPDATE_WISH = 'UPDATE_WISH';
export function updateWish(wish) {
  const reqBodyData = JSON.stringify(wish);
  return fetch(`http://localhost:3000/updateWishlistItem`,
    {
      method: 'POST',
      body: reqBodyData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  ).then(response => response.json())
    .then(json => {
      return {
        type: UPDATE_WISH,
        payload: Object.assign({}, wish)
      }
    });
}

export const WISH_DELETED = 'WISH_DELETED';
export function wishDeleted(wish) {
  const { id } = wish;
  return fetch(`http://localhost:3000/removeWishlistItem/${id}`,
    { method: 'POST' }
  ).then(response => response.json())
    .then(json => {
      return {
        type: WISH_DELETED,
        wish: wish
      }
    });
}

export const WISH_SELECTED_TO_MODIFY = 'WISH_SELECTED_TO_MODIFY';
export function wishSelectedToModify(wish) {
    return {
      type: WISH_SELECTED_TO_MODIFY,
      payload: wish
    }
}

export const MODIFY_SELECTED_WISH = 'WISH_SELECTED_TO_MODIFY';
export function modifySelectedWish(property, value) {
    return {
      type: MODIFY_SELECTED_WISH,
      property: property,
      value: value
    }
}

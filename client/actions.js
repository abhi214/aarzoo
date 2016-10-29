
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

export const WISHLIST_UNSELECTED = 'WISHLIST_UNSELECTED';
export function wishlistUnselected() {
  return { type: WISHLIST_UNSELECTED };
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

export const WISHLIST_CREATED = 'WISHLIST_CREATED';
export function wishlistCreated(wishlistName) {
  return fetch(`http://localhost:3000/createWishlist/${wishlistName}`,
    { method: 'POST' }
  ).then(response => response.json())
    .then(json => {
      return {
        type: WISHLIST_CREATED,
        payload: {
          id: json,
          name: wishlistName
        }
      }
    });
}

////////////////* WISH ACTIONS *////////////////////

export const WISH_CREATED = 'WISH_CREATED';
export function wishCreated(wish) {
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
        type: WISH_CREATED,
        payload: Object.assign({}, wish, { id: json })
      }
    });
}

export const WISH_UPDATED = 'WISH_UPDATED';
export function wishUpdated(wish) {
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
        type: WISH_UPDATED,
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

export const WISH_SELECTED_TO_EDIT = 'WISH_SELECTED_TO_EDIT';
export function wishSelectedToEdit(wish) {
    return {
      type: WISH_SELECTED_TO_EDIT,
      payload: wish
    }
}

export const EDIT_SELECTED_WISH = 'EDIT_SELECTED_WISH';
export function editSelectedWish(property, value) {
    return {
      type: EDIT_SELECTED_WISH,
      property: property,
      value: value
    }
}

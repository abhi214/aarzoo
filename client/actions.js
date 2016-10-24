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
        payload: json
      }
    });
}

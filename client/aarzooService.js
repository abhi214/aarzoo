import Ajax from 'simple-ajax';

module.exports = {
  createWishlist: function(callback, name) {
    var ajax = new Ajax({
      url: `http://localhost:3000/createWishlist/${name}`,
      method: 'PUT',
      dataType: 'json'
    });
    ajax.on('error', (err) => console.log('ERROR', err));
    ajax.send();
  },
  getAllWishlists: function(callback) {
    var ajax = new Ajax({
      url: "http://localhost:3000/allWishlists",
      method: 'GET',
      dataType: 'json'
    });
    ajax.on('success', function(event) {
      callback(JSON.parse(ajax.request.response));
    });
    ajax.on('error', (err) => console.log('ERROR', err));
    ajax.send();
  },
  getWishlist: function(callback, wishlistId) {
    var ajax = new Ajax({
      url: `http://localhost:3000/wishlist/${wishlistId}`,
      method: 'GET',
      dataType: 'json'
    });
    ajax.on('success', function(event) {
      callback(JSON.parse(ajax.request.response));
    });
    ajax.on('error', (err) => console.log('ERROR', err));
    ajax.send();
  }
}

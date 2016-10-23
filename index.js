var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

var connection;
var connectToDB = function(req, res, next) {
  if(!connection) {
    connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'abhi.agarwal',
      password : 'westwing',
      database : 'aarzoo'
    });
    connection.connect();
  }
  next();
}
var endConnectionToDB = function(req, res, next) {
  if(connection) {
    connection.end();
    connection = undefined;
  }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('aarzoo_client'));
app.use(connectToDB);

app.get('/allWishlists', function (req, res, next) {
  connection.query('SELECT id, name FROM wishlists', function(err, rows, fields) {
    if (err) {
      res.status(400).send('Wishes unfulfilled');
    }
    res.json(rows);
    endConnectionToDB();
  });
});

app.get('/wishlist/:wishlistId', function (req, res, next) {
  const { wishlistId } = req.params;
  connection.query('SELECT * FROM wishlists WHERE id = ?', [wishlistId], function(err, rows, fields) {
    if (err) {
      res.status(404).send('Wishlist not found');
    }
    req.params.wishlistName = rows[0].name;
    next();
  });
}, function (req, res, next) {
  const { wishlistId, wishlistName } = req.params;
  connection.query('SELECT * FROM wishlist_items WHERE wishlist_id = ?', [wishlistId], function(err, rows, fields) {
    if (err) {
      res.status(404).send('Wishlist not found');
    }
    const wishlistData = {name: wishlistName, items: rows};
    res.json(wishlistData);
  });
  endConnectionToDB();
});

app.post('/createWishlist/:name', function (req, res) {
  const { name } = req.params;
  connection.query('INSERT INTO wishlists (name) VALUES (?)', [name], function(err, result) {
    if (err) {
      throw err;
    }

    res.json(result.insertId);
  });
  endConnectionToDB();
});

app.post('/updateWishlistName', function (req, res) {
  const { id, name } = req.body;
  connection.query('UPDATE wishlists SET name = ? WHERE id = ?',  [name, id], function(err, result) {
    if (err) {
      throw err;
    }

    res.json(result.changedRows);
  });
  endConnectionToDB();
});

app.post('/destroyWishlist/:wishlistId', function (req, res) {
  const { wishlistId } = req.params;
  connection.query('DELETE FROM wishlists WHERE id = ?', [wishlistId], function(err, result) {
    if (err) {
      throw err;
    }

    res.json(result.insertId);
  });
  endConnectionToDB();
});

app.post('/addWishlistItem', function (req, res) {
  const { item, description, link, price, wishlist_id, priority } = req.body;
  //TODO: Handle the case where priority is null
  connection.query(
    'INSERT INTO wishlist_items (item, description, link, price, wishlist_id, wish_priority) VALUES (?, ?, ?, ?, ?, ?)',
    [item, description, link, price, wishlist_id, priority],
    function(err, result) {
      if (err) {
        throw err;
      }

      res.json(result.insertId);
    }
  );
  endConnectionToDB();
});

app.post('/updateWishlistItem', function (req, res) {
  const {id, item, description, link, price, priority} = req.body;
  const params = ['item', 'description', 'link', 'price', 'priority'];
  var query = 'UPDATE wishlist_items SET ';
  var queryParams = [];
  if(!req.body.id) {
    res.status(400).send('Wishlist Item not specified');
  }
  for(param in req.body) {
    if(params.includes(param)) {
      query += param + ' = ?, ';
      queryParams.push(req.body[param]);
    }
  }
  queryParams.push(id);
  query = query.substring(0, query.length - 2) + ' WHERE id = ?';
  connection.query(query, queryParams, function(err, result) {
    if (err) {
      throw err;
    }
    res.json(result.changedRows);
  });
  endConnectionToDB();
});

app.post('/removeWishlistItem/:wishlistItemId', function (req, res) {
  const { wishlistItemId } = req.params;
  connection.query('DELETE FROM wishlist_items WHERE id = ?', [wishlistItemId], function(err, result) {
    if (err) {
      throw err;
    }

    res.json(result.affectedRows);
  });
  endConnectionToDB();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

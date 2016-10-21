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

app.get('/abhi', function (req, res) {
  res.json({name: 'abhi', age: 25});
});

app.get('/wishlist/:name', function (req, res, next) {
  const { name } = req.params;
  connection.query('SELECT * FROM wishlists WHERE name = ?', [name], function(err, rows, fields) {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  endConnectionToDB();
});

app.get('/wishlistItems/:wishlistId', function (req, res) {
  const { wishlistId } = req.params;
  connection.query('SELECT * FROM wishlist_items WHERE wishlist_id = ?', [wishlistId], function(err, rows, fields) {
    if (err) {
      throw err;
    }

    res.json(rows);
  });
  endConnectionToDB();
});

app.post('/createWishlist/:name', function (req, res) {
  const { name } = req.params;
  connection.query('INSERT INTO wishlist (name) VALUES (?)', [wishlist], function(err, result) {
    if (err) {
      throw err;
    }

    res.json(result.insertId);
  });
  endConnectionToDB();
});

app.post('/updateWishlistName/:wishlist', function (req, res) {
  const { id, name } = req.body;
  connection.query('UPDATE wishlist SET name = ? WHERE id = ?',  [name, id], function(err, result) {
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

app.post('/addWishlistItem/:wishlistItem', function (req, res) {
  const { item, description, link, price } = req.body;
  connection.query(
    'INSERT INTO wishlist_items (item, description, link, price) VALUES (?, ?, ?, ?)',
    [item, description, link, price],
    function(err, result) {
      if (err) {
        throw err;
      }

      res.json(result.insertId);
    }
  );
  endConnectionToDB();
});

app.post('/updateWishlistItem/:wishlistItem', function (req, res) {
  const {id, item, description, link, price} = req.body;
  const queryParams = [item, description, link, price, id];
  connection.query('UPDATE wishlist_items SET item = ?, description = ?, link = ?, price = ? WHERE id = ?', queryParams, function(err, result) {
    if (err) {
      throw err;
    }

    result.json(result.changedRows);
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

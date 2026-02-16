var express = require('express');
var router = express.Router();

/* GET home page - API info */
router.get('/', function (req, res, next) {
  res.json({
    message: 'Cake Store API',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /users/register',
        login: 'POST /users/login',
        setupAdmin: 'POST /users/setup-admin'
      },
      products: {
        getAll: 'GET /products',
        create: 'POST /products (admin)',
        update: 'PUT /products/:id (admin)',
        delete: 'DELETE /products/:id (admin)'
      },
      cart: {
        get: 'GET /users/cart',
        add: 'POST /users/cart'
      }
    }
  });
});

module.exports = router;

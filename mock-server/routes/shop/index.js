const express = require('express');
const { db } = require('../../db');

const router = express.Router();

const getProduct = (id) => {
  const result = db.get('products')
    .find({ id: parseInt(id, 10) })
    .value();

  return result;
};

const addCartItem = (item) => {
  const result = db.get('cart.items')
    .push(item)
    .write();

  return result;
};

const getCartItem = (id) => {
  const result = db.get('cart.items')
    .find({ product_id: parseInt(id) })
    .value();

  return result;
};

const updateCartItem = (id, item) => {
  const result = db.get('cart.items')
    .find({ product_id: parseInt(id) })
    .assign(item)
    .write();

  return result;
};

const removeCartItem = (id) => {
  const result = db.get('cart.items')
    .remove({ product_id: parseInt(id) })
    .write();

  return result;
};

const updateCartTotal = () => {
  const total = db.get('cart.items')
    .map('total')
    .value();

  const value = total.reduce((v1, v2) => {
    return v1 + v2;
  }, 0);

  db.get('cart')
    .assign({ total: value })
    .write();
};

const clearCart = () => {
  const result = db.set('cart', {
    total: 0,
    items: []
  }).write();

  return result;
};

router.get('/shopping-cart', (req, res) => {
  const cart = db.get('cart')
    .value();

  res.jsonp(cart);
});

router.post('/cart-item', (req, res) => {
  const productId = parseInt(req.body.product_id, 10);
  const quantity = parseInt(req.body.quantity, 10);

  const product = getProduct(productId);

  if (!product) {
    res.sendStatus('404');
    return;
  }

  const { name, price, images } = product;
  const total = parseInt(price) * parseInt(quantity);

  let item = {
    product_id: productId,
    name,
    image: images[0].src,
    price,
    quantity,
    total
  };

  const result = getCartItem(productId);

  if (result) {
    item.quantity = parseInt(quantity) + parseInt(result.quantity);
    item.total = total + parseInt(result.total);

    updateCartItem(productId, item);
    updateCartTotal();
    res.jsonp('success');
  } else {
    addCartItem(item);
    res.sendStatus('201');
    updateCartTotal();
  }
});

router.patch('/cart-item/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const quantity = parseInt(req.body.quantity);
  const product = getProduct(id);

  if (!product) {
    res.sendStatus('404');
    return;
  }

  const result = getCartItem(id);

  if (!result) {
    res.sendStatus('404');
    return;
  }

  const { name, price, images } = product;
  const total = parseInt(price) * parseInt(quantity);

  let item = {
    product_id: id,
    name,
    image: images[0].src,
    price,
    quantity,
    total
  };

  updateCartItem(id, item);
  updateCartTotal();

  res.jsonp(item);
});

router.put('/cart-item/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const quantity = parseInt(req.body.quantity);
  const product = getProduct(id);

  if (!product) {
    res.sendStatus('404');
    return;
  }

  const result = getCartItem(id);

  if (!result) {
    res.sendStatus('404');
    return;
  }

  const { name, price, images } = product;
  const total = parseInt(price) * parseInt(quantity);

  let item = {
    product_id: id,
    name,
    image: images[0].src,
    price,
    quantity,
    total
  };

  updateCartItem(id, item);
  updateCartTotal();

  res.jsonp(item);
});

router.delete('/cart-item/:id', (req, res) => {
  const id = parseInt(req.params.id);
  removeCartItem(id);
  updateCartTotal();
  res.sendStatus(200);
});

router.post('/cart/clear', (req, res) => {
  clearCart();
  res.sendStatus(200);
});

module.exports = router;

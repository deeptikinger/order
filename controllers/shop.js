const Product = require('../models/products');

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.status(200).send(products)
        })
        .catch(err => console.log(err));
    })
    .catch(err => res.status(500).send({error:err}));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  console.log(req.user)

  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        console.log(oldQuantity)
        console.log(newQuantity)
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then((result) => {
      console.log(result)
    res.status(200).send({
      result,
      message:"Adding to cart successfully"
      })
    })
    .catch(err => res.status(500).send({
      error:err
    }));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => res.status(500).send({
      error:err
    }));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return req.user
        .createOrder({
          userName:'ABC',
          status:req.body.status
        })
        .then(order => {
          console.log(order)
          return order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity ,amount:product.cartItem.quantity*product.price};
              console.log("****")
              console.log(product)
              return product;
            })
          );
        })
        .catch(err => console.log(err));
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then(result => {
      res.send(result);
    })
    .catch(err => res.send(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({include: ['products']})
    .then(orders => {
       res.status(200).send({
         orders,
         message:'All Orders'
       })
    })
    .catch(err => res.send(err));
};

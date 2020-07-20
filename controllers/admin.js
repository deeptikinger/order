const Product = require('../models/products');

exports.getProducts = (req, res, next) => {
    Product.findAll()
    .then((prods)=>{
        res.status(200).send(prods)
    })
    .catch((err)=>{
        res.status(500).send({
        error:err   
        })
    })
};

exports.postProduct = (req, res, next) => {
    console.log(req.body)
  
    Product.create({
      model:req.body.model,
      reference:req.body.reference,
      functions:req.body.functions,
      material:req.body.material,
      price: parseInt(req.body.price)
    })
    .then(result => {
        console.log(result)
        res.status(200).send(result)
    })
    .catch(err => {
        res.status(500).send({
            error:err   
      })
    });
};


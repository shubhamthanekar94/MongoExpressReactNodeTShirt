const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Product not found!!",
      });
    }
    req.product = product;
    next();
  });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      res.status(400).json({
        error: "Problem with image creation!!",
      });
    }
    //destructure the fields
    const { name, description, price, catagory, stock } = fields;

    if (!name || !description || !price || !stock || !catagory) {
      return res.status(400).json({
        error: "Please include all the fields!!",
      });
    }

    //TODO: restrictions on field
    let product = new Product(fields);
    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        //file should not be bigger than 3 MB
        return res.status(400).json({
          error: "File size too big!!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving Tshirt in DB failed!!",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined; //for fast response and performance optimization we are removing photo in the response to user
  return res.json(req.product);
};

//middleware for photos : This is separate middleware for photoes for performance optimization
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
};

//delete controller
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product!!",
      });
    }
    res.json({
      message: "Deletion is successfull!!",
      deletedProduct,
    });
  });
};

//update controller
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      res.status(400).json({
        error: "Problem with image creation!!",
      });
    }

    //updatation code
    let product = req.product; //gets the existing product
    product = _.extend(product, fields); //used loadash : takes existing values u r having in obj and extends that values with updated values and then updates the value

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        //file should not be bigger than 3 MB
        return res.status(400).json({
          error: "File size too big!!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Updation of product failed!!",
        });
      }
      res.json(product);
    });
  });
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8; //if user sends any limit then its taken as a query and if not then set default limit as 8
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .select("-photo")
    .populate("catagory")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No Product Found!!",
        });
      }
      res.json(products);
    });
};

exports.getAllUniqueCatagories = (req, res, next) => {
  Product.distinct("catagory", {}, (err, catagory) => {
    if (err) {
      return res.status(400).json({
        error: "No catagory found!!",
      });
    }
    res.json(catagory);
  });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    //map will lopp thru every single product
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } }, //when user buys a prod it should decrease stock count and increase sold count
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed!!",
      });
    }
    next();
  });
};

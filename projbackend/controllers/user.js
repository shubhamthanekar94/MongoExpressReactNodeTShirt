const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  //id is coming up from URL in the route
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  //this part is to hide few user profile details from the POST request
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;

  return res.json(req.profile);
};

/* exports.getallUsers = (req, res) => {
    User.find().exec((err, users) => {
        if(err || !users){
            return res.status(400).json({
                error: "No users found!!"
            })
        }
        res.json(users)
        next()
    })
} */

//this is a PUT method to update the records
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not auhorized to update this user",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({
    user: req.profile._id
      .populate("user", "_id name") //populate is used because user is the another collection referred in the order.js => OrderSchema
      .exec((err, order) => {
        if (err) {
          return res.status(400).json({
            error: "No order in this account!!",
          });
        }
        return res.json(order);
      }),
  });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      catagory: product.catagory,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transcation_id: req.body.order.transaction_id,
    });
  });
  //store in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true }, //from DB send me back the Obj which is updated one not the old one
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }
      next();
    }
  );
};

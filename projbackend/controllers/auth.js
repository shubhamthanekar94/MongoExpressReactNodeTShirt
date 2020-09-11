const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()[0].msg });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save user in DB",
      });
    }
    res.json({
      //to filter unwanted user information comming out in user variable and displaying only the required fileds on POST req in POSTMAN
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });

  /*  console.log("REQ BODY", req.body)
    res.json({
        message: "signup route works!" //json response
    }) */
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()[0].msg });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error:
          "Wrong EmailId or User doesn't exist, Please signup first or enter valid EmailId!",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Wrong Password, Please enter valid password!",
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token"); //to clear generated cookie token to end the user session
  //res.send('user signout success') //regular response
  res.json({
    message: "User signout successfully", //json response
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth", //any name u can give here....here its given as "auth"
});

//custom middleware

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  //req.profile => Going to setup from FrontEnd ,
  //req.auth => Going to set by middlewre isSignedIn and
  //req.profile._id === req.auth._id => Going to compair the ID set by FrontEnd i:e req.profile._id
  //is same as ID set by isSignedIn i:e req.auth. ==> then the user is authenticated
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next(); //next() is used to transfer the control from one middleware to another, So as this is custom middlewear where we
  //aren't using JWT Middleware, we have to use manually next() method but in JWT middleware
  //this next() method is taken care inbuilt by JWT
};

exports.isAdmin = (req, res, next) => {
  //to check user is admin or regular user. 0 => regular user and 1 => Admin user
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not an Admin, Access Denied!!",
    });
  }
  next();
};

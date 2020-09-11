var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { signup, signout, signin, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "name must be alphabeic and min length 3")
      .isAlpha()
      .isLength({ min: 3 }), //check("name", "Name should not be empty").notEmpty(),
    check("email", "email is required").isEmail(),
    check("password", "password should be of min length 3").isLength({
      min: 8,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 }),
  ],
  signin
);

router.get("/signout", signout);

// router.get("/testroute", isSignedIn, (req, res) => {
//   //res.send("A Protected Route")
//   res.json(req.auth);
// });

module.exports = router;

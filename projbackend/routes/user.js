const express = require('express')
const router = express.Router()

const {getUserById, getUser, updateUser, userPurchaseList/* getallUsers */} = require("../controllers/user")
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")

router.param("userId", getUserById)

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser)

router.put("/user/:userId",  isSignedIn, isAuthenticated, updateUser)

router.get("/orders/user/:userId",  isSignedIn, isAuthenticated, userPurchaseList)

/* router.get("/users", getallUsers) */ //its an assignment to get all users from DB

module.exports = router
const express = require('express')
const router = express.Router()

const {getProductById, createProduct, getProduct, photo, updateProduct, deleteProduct, getAllProducts, getAllUniqueCatagories} = require("../controllers/product")
const {isAdmin, isAuthenticated, isSignedIn} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

//params
router.param("userId", getUserById)
router.param("productId", getProductById)

//actual routes
//create route
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct)

//read route
router.get("/product/:productId", getProduct)
router.get("/product/photo/:productId", photo)

//delete route
router.delete("/product/:productId/:userId",isSignedIn, isAuthenticated, isAdmin, deleteProduct)


//update route
router.put("/product/:productId/:userId",isSignedIn, isAuthenticated, isAdmin, updateProduct)

//listing route : Getting all the products ( limiting the number of products : here we are limiting 8 products at a time)
router.get("/products", getAllProducts) //we are not using any middlewares here because all users should see all the products without any condition

router.get("/products/catagories", getAllUniqueCatagories)

module.exports = router



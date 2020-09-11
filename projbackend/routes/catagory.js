const express = require('express') 
const router = express.Router()  //express creates Routers 

const {getCatagoryById, createCatagory, getAllCatagories, getCatagory, updateCatagory, removeCatagory} = require("../controllers/catagory")
const {isSignedIn, isAdmin, isAuthenticated} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

//params
router.param("userId", getUserById)
router.param("catagoryId", getCatagoryById)

//actual routes goes here

//create route
router.post("/catagory/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCatagory) //here order of middlewares matters i:e he should be signedIn first then he should be authenticated and then Admin

//read routes
router.get("/catagory/:catagoryId", getCatagory)
router.get("/catagories", getAllCatagories)

//update route
router.put("/catagory/:catagoryId/:userId",isSignedIn, isAuthenticated, isAdmin, updateCatagory) //here order of middlewares matters i:e he should be signedIn forst then he should be authenticated and then Admin


//delete route
router.delete("/catagory/:catagoryId/:userId",isSignedIn, isAuthenticated, isAdmin, removeCatagory) //here order of middlewares matters i:e he should be signedIn forst then he should be authenticated and then Admin


module.exports = router
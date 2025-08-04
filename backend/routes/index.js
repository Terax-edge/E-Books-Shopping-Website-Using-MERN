const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/usersignup")
const userSignInController = require("../controller/user/usersignin")
const userDetailsController = require("../controller/user/userDetails")
const authToken = require("../middleware/authToken");
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateuser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')


router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)

// admin panel
router.get("/all-users",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct", getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details", getProductDetails)


module.exports = router
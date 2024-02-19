const express = require('express');
const {loginController, registerController}  = require('../controllers/userController');
const router = express.Router();
const multer = require('multer');
const path = require('path');


//routes
//method-get
router.post("/login", loginController);

//method-post
router.post("/register", registerController)



module.exports = router;
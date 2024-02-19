const express = require('express');
const {addBillsController, getBillsController}  = require('../controllers/billsController');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage})

//routes
;

//method-post
router.post("/add-bills", addBillsController)
router.get("/get-bills", getBillsController)





module.exports = router;
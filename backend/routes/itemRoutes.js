const express = require('express');
const {getItemController, addItemController, editItemController, deleteItemController}  = require('../controllers/itemController');
const router = express.Router();


// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb){
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// });

// const upload = multer({ storage: storage})

//routes
//method-get
router.get("/get-items", getItemController);

//method-post
router.post("/add-items", addItemController)

//method-update
router.put("/edit-items", editItemController)

//method-delete
router.post("/delete-items", deleteItemController)

// router.post("/upload", upload.single("image"), (req, res) => {
//     if(!req.file){
//         return res.status(400).send('No file uploaded.');
//     }
//     res.send('File uploaded successfully.');
// });

module.exports = router;
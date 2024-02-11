// const Items = require('../models/itemModel');
const itemModel = require('../models/itemModel')

//get-items
const getItemController = async(req, res) => {
    try{
        const items = await itemModel.find();
        res.status(200).send(items);
    }catch(error){
        console.log(error)
    }
};

//add-items
const addItemController = async (req, res) => {
    try {
        const newItem = new itemModel(req.body);
        await newItem.save();
        res.status(201).send("Item created successfully!");
    } catch (error) {
        // Use res.status().send() to send error response with status code and error message
        res.status(400).send(error.message);
        console.log(error);
    }
}

// const addItemController = async (req, res) => {
//     try {
//         // Extract file path or URL from the uploaded file array
//         const { filename } = req.file; // Assuming Multer has stored the file in 'filename'

//         // Create a new item object with the extracted file path or URL
//         const newItem = new Item({
//             name: req.body.name,
//             price: req.body.price,
//             category: req.body.category,
//             image: filename // Use the extracted file path or URL here
//         });

//         // Save the new item to the database
//         await newItem.save();

//         // Respond with success message
//         return res.status(200).json({ message: 'Item added successfully', newItem });
//     } catch (error) {
//         // Handle errors
//         console.error('Error adding item:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };

//update-items

const editItemController = async (req, res) => {
    try {
        await itemModel.findOneAndUpdate({_id: req.body.itemId}, req.body)
        res.status(201).send("Item Updated Sucessfully!")

    } catch (error) {
        res.status(400).send(error.message);
        console.log(error)
    }
}

const deleteItemController = async (req, res) => {
    try {
        await itemModel.findOneAndDelete({_id:req.body.itemId})
        res.status(200).send("Item Deleted Sucessfully!")

    } catch (error) {
        res.status(400).send(error.message);
        console.log(error)
    }
}

module.exports = {getItemController, addItemController, editItemController, deleteItemController};
const billsModel = require('../models/billsModel')

const addBillsController = async (req, res) => {
    try {
        const newBill = new billsModel(req.body);
        await newBill.save();
        res.send("Bill generated successfully!");
    } catch (error) {
        // Use res.status().send() to send error response with status code and error message
        res.send(error.message);
        console.log(error);
    }
}

const getBillsController = async(req, res) => {
    try{
        const bills = await billsModel.find();
        res.send(bills);
    }catch(error){
        console.log(error)
    }
};





module.exports = {addBillsController, getBillsController};
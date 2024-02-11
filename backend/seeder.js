const mongoose = require('mongoose');
const dotenv = require('dotenv')
const connectDb = require('./config/config')
const itemsModel = require('./models/itemModel')
const items = require('./utils/data')

//config
dotenv.config()

//db config
connectDb()

//function seeder
const importData = async() => {
    try{
        await itemsModel.deleteMany();
        const itemsData = await itemsModel.insertMany(items);
        console.log(`All Items added!`);
        process.exit();
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

importData();
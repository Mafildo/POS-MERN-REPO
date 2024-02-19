const express = require ('express');
const morgan = require ('morgan');
const cors = require ('cors');
const dotenv = require ('dotenv');
const connectDb =require ('./config/config')
const bodyParser = require ('body-parser');

//dotenv config

dotenv.config();

//rest object
const app = express();

//middlewares 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan("dev"))

//connect to database
connectDb()


//routes
app.use('/api/items', require('./routes/itemRoutes'))
app.use('/api/users', require('./routes/userRoute'))
app.use('/api/bills', require('./routes/billsRoute'))



const PORT = process.env.PORT || 8080;

//PORT
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})
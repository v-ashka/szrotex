const mongoose = require('mongoose')
const seedDB = require("./insertAddressesToDb.js");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        seedDB()
    }
    catch(err){
        console.log(err)
    }
}


module.exports = connectDB
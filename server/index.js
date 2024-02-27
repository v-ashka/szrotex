require("dotenv").config();
const express = require('express');
require('express-async-errors')
const { logger, logEvents} = require("./middleware/logger");
const app = express();
const path = require('path');
const cors = require('cors')
const corsOptions = require("./config/corsOptions");
const port = process.env.PORT || 3500;
const cookieParser = require('cookie-parser')
// DB Mongo
const connectDB = require("./config/dbConnect");
const mongoose = require('mongoose');
const errorHandler = require("./middleware/errorHandler");
const fileUpload = require('express-fileupload');

connectDB()
app.use(logger)
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/', require('./routes/root'))
app.use(fileUpload({
    limits: {
        fileSize: 10000000
    },
    abortOnLimit: true,
}))
// routes
app.use('/users', require('./routes/userRoutes'))
app.use('/upload', require('./routes/mediaRoute'))
app.use('/product', require('./routes/productRoute'))
app.use('/reservation', require('./routes/reservationRoute'))

app.all("*", (req,res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if(req.accepts('json')){
        res.json({message: "404 Not Found"})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)


mongoose.connection.once('open', () => {
    console.log(`Connected to MongoDB - dbname: ${mongoose.connection.db.databaseName}`)
    app.listen(port, () => console.log(`Server running on port: ${port}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    const reDot = /[.]/
    const mongoMessageIndex = err.stack.search(reDot)
    const mongoMessage = err.stack.slice(0, mongoMessageIndex)
    logEvents(`Error code: ${err.code}: ${err.codeName}\t${err.errorLabels}\t${mongoMessage}`, 'mongoErrLog.log')
})

// OLD - Routes
// console.log('before user router');
// const userRouter = require('./routes/users');

// app.use('/api', userRouter);
// console.log('after user router');


// app.listen(port, () => {
//     console.log(`Server start running at port: ${port}`);
// });

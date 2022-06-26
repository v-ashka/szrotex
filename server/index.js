const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');

// DB Mongo
const mongoose = require('mongoose');
const port = process.env.PORT || 3500;

require("dotenv").config();

app.use(cors());
app.use(express.json())

// Initialize database connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }).catch((err) => {
    console.log(`Błąd połączenia z bazą danych!: ${err}`)
})

// Connect to the database
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Pomyślnie połączono z bazą danych MongoDB!');
    console.log(mongoose.modelNames())
})

// Routes
console.log('before user router');
const userRouter = require('./routes/users');

app.use('', userRouter);
console.log('after user router');
// deploy

__dirname = path.resolve();
// test = path.resolve().split('\\');
// newArr = test.slice(0,-1);
// __dirname = "";
// newArr.map((item) => __dirname+=item+'\\');

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
        console.log(__dirname);
    }
    );
}


app.listen(port, () => {
    console.log(`Server start running at port: ${port}`);
});

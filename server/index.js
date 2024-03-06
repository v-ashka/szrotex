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


const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB,
    MONGO_REPLICASET
  } = process.env;

// Initialize database connection
// const uri = process.env.ATLAS_URI;
// const url2 = `mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb`
// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?replicaSet=${MONGO_REPLICASET}&authSource=admin`;

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/dev'

// mongoose.connect(uri, { useNewUrlParser: true }).catch((err) => {
//     console.log(`Błąd połączenia z bazą danych!: ${err}`)
// })


mongoose.connect(mongoURL, { useNewUrlParser: true }).catch((err) => {
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

app.use('/api', userRouter);
console.log('after user router');
// deploy

__dirname = path.resolve();

console.log(__dirname);
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    app.get("*", (req, res) => {
        console.log(__dirname);
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    }
    );
}


app.listen(port, () => {
    console.log(`Server start running at port: ${port}`);
});

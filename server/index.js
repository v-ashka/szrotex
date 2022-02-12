const express = require('express');
const app = express();
const cors = require('cors')

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
    console.log('Pomyślnie połączono z bazą danych MongoDB')
})

// Routes
const userRouter = require('./routes/users');

app.use('', userRouter);

app.listen(port, () => {
    console.log(`Server start running at port: ${port}`);
});

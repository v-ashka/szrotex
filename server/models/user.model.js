const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        description: { type: String, required: false },
        workStartHour: { type: Number, required: false },
        workEndHour: { type: Number, required: false },
        phoneNumber: { type: Number, required: true },
        products: [{name: String, date: Date, price: Number, desc: String, img: String}],
    },
    {collection: 'eszrotUsers'}
)

const model = mongoose.model('eszrotUsers', User)

module.exports = model;
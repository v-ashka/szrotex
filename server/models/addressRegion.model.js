const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const addressSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
        index: true,
    },
    city: {
        type: String,
        required: true,
        index: true,
    },
    zipCode: {
        type: String,
        required: true,
        index: true
    },
    street: {
        type: String,
        required: true,
    },
    buildingNumber: {
        type: String,
        required: false,
    },
    apartamentNumber: {
        type: String,
        required: false,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }


})

module.exports = mongoose.model("address", addressSchema)

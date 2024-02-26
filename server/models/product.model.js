const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "szrotexUser"
    },
    name: {
        type: String,
        maxLength: 40,
        require: true,
    },
    description: {
        type: String,
        maxLength: 300,
        require: false,
        default: ''
        
    },
    price: {
        type: Number,
        require: true,
    },
    productImg: {
        type: String,
        require: false,
        default: ''
    },
    tags: [{
        type: [String],
    }],
    active: {
        type: Boolean,
        default: true
    },
    productProperties: [{
        id: {
            type: mongoose.Schema.Types.ObjectId
        },
        name: {
            type: String
        },
        value: {
            type: String
        }
    }],
    productReservation: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "szrotexUser"
        },
        reservationStartDate: {
            type: Date,
            default: Date.now()
        },
        reservationEndDate: {
            type: Date,
            default: Date.now() + 7
        }
    },
    category: {
        type: [String],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("product", productSchema)

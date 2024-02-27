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
    quantity:{
        type: Number,
        require: true,
        default: 0
    },
    currency: {
        name: {
            type: String,
            default: 'PLN'
        },
        value: {
            type: String,
            default: 'zł'
        }
    },
    deliveryOption: {
        type: Boolean,
        default: false
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
        },
        reservationEndDate: {
            type: Date,
        }
    },
    productRegion: {
        voivodeship: {
            type: String,
        },
        street: {
            type: String,
        },
        zip: {
            type: String,
        },
        city: {
            type: String,
        }
    },
    category: {
        type: [String],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("product", productSchema)

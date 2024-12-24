const mongoose = require('mongoose')
const { create } = require('./addressRegion.model')

const vehicleDeatilsSchema = new mongoose.Schema({
    model:{
        type: String,
    },
    yearFrom:{
        type: Number,
    },
    yearTo: {
        type: Number,
    },
    type: {
        type: String,
        enum: ['car', 'motorcycle', 'truck', 'bus', 'other', 'tractor'],
        required: true,
    },
    engineType: String,
    engineCapacity: Number,
    generation: String,
})

const partDetailsSchema = new mongoose.Schema({
    manufacturer: String,
    partNumber: String,
    condition: {
        type: String,
        enum: ['new', 'used', 'refurbished'],
        required: true,
    },
    weight: Number,
    dimensions: {
        width: Number,
        height: Number,
        length: Number,
    },
    originalPart: Boolean,
    warranty: {
        available: Boolean,
        months: Number,
    },
    additionalProperties: [{
        name: String,
        value: String,
    }]
})

const deliveryDetailsSchema = new mongoose.Schema({
    shippingAvailable: {
        type: Boolean,
        required: true,
        default: false,
    },
    personalPickup:{
        type: Boolean,
        required: true,
        default: false,
    },
    shippingMethods: [{
        method: String,
        price: Number
    }],
    pickupLocation: {
        address:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
            required: true,
        },
        type: {
            type: String,
            enum: ['store', 'private'],
            required: true,
        }
    }
})

const productImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    isMain: {
        type: Boolean,
        default: false,
    },
    order: {
        type: Number,
        default: 0,
    }
})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        current: {
            type: Number,
            required: true,
        },
        negotiable: {
            type: Boolean,
            default: true,
        },
    },
    category: {
        main: {
            type: String,
            required: true,
            index: true,
        },
        sub: String
    },
    images: [productImageSchema],
    vehicleDetails: vehicleDeatilsSchema,
    partDetails: partDetailsSchema,
    deliveryDetails: deliveryDetailsSchema,
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'reserved', 'sold', 'inactive'],
        required: true,
        default: 'active',
        index: true,
    },
    reservationDetails: {
        isReserved: {
            type: Boolean,
            default: false,
        },
        reservedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        reservedUntil: Date,
    },
    views: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true,
    },
    updatedAt: Date,
})



module.exports = mongoose.model("product", productSchema)

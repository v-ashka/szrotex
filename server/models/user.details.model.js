const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const userDetails = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "szrotexUser"
    },
    companyName: {
        type: String,
    },
    region: {
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
    description: { 
        type: String,
        required: false,
    },
    workSchedule: [
        {
            dayName: String,
            startTime: Date,
            endTime: Date,
            isDayOff: Boolean }
    ],
    phoneNumber: { 
        type: Number,
    },
    imageBackgroundPage: {
        type: String,
        defualt: ''
    },
})

module.exports = mongoose.model("userDetails", userDetails)



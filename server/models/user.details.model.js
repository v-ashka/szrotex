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
        default: ""
    },
    region: {
        voivodeship: {
            type: String,
            default: ""
        },
        street: {
            type: String,
            default: ""
        },
        zip: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        }
    },
    description: { 
        type: String,
        required: false,
        default: ''
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
        default: '', 
    },
    imageBackgroundPage: {
        type: String,
        defualt: ''
    },
})

module.exports = mongoose.model("userDetails", userDetails)



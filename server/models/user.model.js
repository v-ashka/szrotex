const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        region: {type: String, required: false},
        description: { type: String, required: false },
        workStartHour: { type: Number, required: false },
        workEndHour: { type: Number, required: false },
        phoneNumber: { type: Number, required: true },
        workSchedule: {Monday: {Start: Number, End: Number}, Tuesday: {Start: Number, End: Number}, Wednesday: {Start: Number, End: Number}, Thursday: {Start: Number, End: Number}, Friday: {Start: Number, End: Number}, Saturday: {Start: Number, End: Number }, Sunday: {Start: Number, End: Number}},
        products: [{ name: String, date: Date, price: Number, desc: String, img: String, tags: [{ name: String }]}],
    },
    {collection: 'eszrotUsers'}
)

const model = mongoose.model('eszrotUsers', User)

module.exports = model;
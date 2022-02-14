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
        workSchedule: {Monday: {Start: Number, End: Number, FreeDay: Boolean}, Tuesday: {Start: Number, End: Number, FreeDay: Boolean}, Wednesday: {Start: Number, End: Number, FreeDay: Boolean}, Thursday: {Start: Number, End: Number, FreeDay: Boolean}, Friday: {Start: Number, End: Number, FreeDay: Boolean}, Saturday: {Start: Number, End: Number, FreeDay: Boolean}, Sunday: {Start: Number, End: Number, FreeDay: Boolean}},
        products: [{ name: String, date: Date, price: Number, desc: String, img: String, tags: [{ name: String }]}],
    },
    {collection: 'eszrotUsers'}
)

const model = mongoose.model('eszrotUsers', User)

module.exports = model;
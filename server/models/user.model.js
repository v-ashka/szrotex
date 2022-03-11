const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        region: {voivodeship: String, street: String, zip: String, city: String},
        description: { type: String, required: false },
        workStartHour: { type: Number, required: false },
        workEndHour: { type: Number, required: false },
        phoneNumber: { type: Number, required: true },
        workSchedule: {Monday: {Start: String, End: String, FreeDay: Boolean}, Tuesday: {Start: String, End: String, FreeDay: Boolean}, Wednesday: {Start: String, End: String, FreeDay: Boolean}, Thursday: {Start: String, End: String, FreeDay: Boolean}, Friday: {Start: String, End: String, FreeDay: Boolean}, Saturday: {Start: String, End: String, FreeDay: Boolean}, Sunday: {Start: String, End: String, FreeDay: Boolean}},
        products: [{ name: String, date: Date, price: Number, desc: String, img: String, tags: Array, reservation: Boolean, category: String}],
        rating: { numbers: Array },
        reservation: [{ productId: mongoose.SchemaTypes.ObjectId, reservationDate: Date, expiryDate: Date, productBasicInfo: { name: String, price: Number, img: String } }]
    },
    {collection: 'eszrotUsers'}
)

const model = mongoose.model('eszrotUsers', User)

module.exports = model;
const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        email: { 
            type: String,
            required: true,
             unique: true 
        },
        password: { 
            type: String,
            required: true 
        },
        firstName: { 
            type: String,
            required: false,
            default: ''
        },
        lastName: { 
            type: String,
            required: false,
            default: ''
        },
        role: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            default: true
        },
        avatarImage: {
            type: String,
            default: ''
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {collection: 'szrotexUser'}
)

const model = mongoose.model('szrotexUser', User)
module.exports = model;
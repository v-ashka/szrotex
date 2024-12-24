const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const categorySchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
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
    },
    parent_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: false,
    },
    active: {
        type: Boolean,
        default: 0
    },
    level_depth: {
        type: Number,
        require: false,
    },
    date_add: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("category", categorySchema)

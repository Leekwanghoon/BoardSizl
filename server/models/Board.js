const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 30
    },
    subTitle: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String,
        maxlength: 400
    },
    images: {
        type: Array,
        default: []
    },
    views: {
        type: Number,
        default: 0
    }
}, {  timestamps: true })

const Board = mongoose.model('Board', boardSchema);

module.exports = { Board }
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const feedSchema = new Schema({
    feedname: {
        type: String,
    },
    feedlink: {
        type: String,
    },
    createDate: {
        type: Date,
        default: Date.now,
    }
})

export const feedModel = mongoose.models.feed || mongoose.model('feed', feedSchema)
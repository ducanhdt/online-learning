const mongoose = require("mongoose");


const { ObjectId } = mongoose.Types;

const tweetSchema = new mongoose.Schema({
        class: { type: ObjectId, ref: 'Classroom' },    
        text: {
            type: String,
            required: true,
            maxLength: 160
        },
        user: { type: String,
            required: true },
    }, {
        timestamps: true
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;

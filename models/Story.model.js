const { Schema, model } = require("mongoose");

const storySchema = new Schema({
    title: {
        type: String,
        required: true
        },
    description: {
        type: String,
        required: true
        },
    author: {
        type: {},
        },
    imgUrl: {
        type: String,
    },
    
    tags: {
        type: Array,
        required: false

    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'locations'
    },
    latitude: Number, // Add latitude field
    longitude: Number, // Add longitude field
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'

    }]

});

const Story = model("Story", storySchema);

module.exports = Story;

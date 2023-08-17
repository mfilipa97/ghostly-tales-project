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
        default: "https://res.cloudinary.com/ghostly/image/upload/v1692265458/ghostly-tales/story-default-image_hjbare.jpg"
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

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
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    imgUrl: {
        type: String,
        required: false
    },
    
    tags: {
        type: Array,
        required: true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'locations'
    }
});

const Story = model("Story", storySchema);

module.exports = Story;

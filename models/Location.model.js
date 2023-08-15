const {Schema, model} = require('mongoose');

const locationSchema = new Schema ({
    name: {
        type: String,
        required: true
        },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    stories: [{
        type: Schema.Types.ObjectId,
        ref: "stories"  
    }],
});

const Location = model('Location', locationSchema);

module.exports = Location;
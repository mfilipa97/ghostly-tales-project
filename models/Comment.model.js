const {Schema, model} = require ('mongoose');

const commentSchema = new Schema ({
    content: String,
    author: {
        type: Schema.Types.ObjectId,
        ref:'User'
    }
});

module.exports = model('Comment', commentSchema);


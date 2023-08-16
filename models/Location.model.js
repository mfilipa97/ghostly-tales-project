const {Schema, model} = require('mongoose');

const locationSchema = new Schema ({
    name: {
        type: String,
        required: true
    },

    location:{
         type: {
             type: String 
            }, 
        coordinates: [Number] 
        
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

locationSchema.index({ location: '2dsphere' });


const Location = model('Location', locationSchema);

module.exports = Location;
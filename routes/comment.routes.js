// Grab Express and browser
const express = require('express');
const router = express.Router();
const bingMapsKey = process.env.BING_MAPS_API_KEY; // Replace with your actual API key
const bingmaps = require('bingmaps');

// Grab models and middleware
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const Story = require("../models/Story.model");
const Comment = require("../models/Comment.model")


// COMMENTS

// POST- Create comment from User Account

router.post('/:storyId', isLoggedIn,async (req,res) => {
    try{
        const {storyId} = req.params;
        const {content} = req.body;

        let foundUser = await User.findById(req.session.currentUser._id);
        const newComment = await Comment.create({content,author:foundUser._id});

        // Update the Story with new comment that was created

        const StoryUpdate = await Story.findByIdAndUpdate(storyId, {$push: {comments: newComment._id}});
        console.log(await Story.findById(storyId).comments);

        res.redirect(`/story/${storyId}`)
    }
    catch(error){
        console.log(error)
    }

})

// // POST - Delete Comment
// router.post('/:storyId/delete', async (req,res)=>{
//     try{
//         const {storyId} = req.params;
//         const removedComment = await Comment.findByIdAndRemove(reviewId);

//         await User.findByIdAndUpdate(removedReview.author, {$pull: {reviews: removedReview._id}});

//         res.redirect('/books');

//     }
//     catch(error){
//         console.log(error);
//     }

// });

module.exports = router;
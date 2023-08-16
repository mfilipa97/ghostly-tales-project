// Grab Express and browser
const express = require('express');
const router = express.Router();

// Grab models and middleware
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const Story = require("../models/Story.model");
const Comment = require("../models/Comment.model")


// COMMENTS

// POST- Create comment from User Account

router.post('/:storyId/comment/create', isLoggedIn,async (req,res) => {
    try{
        const {storyId} = req.params;
        const {content} = req.body;

        console.log ("content of comment is: ", content);
        let foundUser = await User.findById(req.session.currentUser._id);
        const newComment = await Comment.create({content,author:foundUser});
        console.log ("new comment is: ", newComment);


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
router.post('/:storyId/comment/delete/:commentId', isLoggedIn,async (req,res)=>{
    try{
        const {storyId, commentId} = req.params;
        const {_id} = req.session.currentUser;
        await Comment.findByIdAndRemove(commentId);

        await User.findByIdAndUpdate( _id, {$pull: {comments: commentId}});

        res.redirect(`/story/${storyId}`)

    }
    catch(error){
        console.log(error);
    }

});

module.exports = router;
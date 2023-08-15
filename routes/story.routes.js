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

// Grab fileUpLoader middleware from Cloudinary Configurations
const fileUpLoader = require('../config/cloudinary.config');

// *ROUTES*
// CRUD of Stories



// Create
// GET - Display Story create form
router.get('/create',isLoggedIn, (req, res)=>{
    let currentUser = req.session.currentUser;
    res.render('story/story-create', currentUser)
});

// GET - Redirect User from form if not logged in
router.get('/create',isLoggedOut, (req, res)=>{
    res.redirect('/story/list')
});


// POST - Create Story from Form
router.post ('/create',fileUpLoader.single("imgUrl"),isLoggedIn, async (req,res) => {
  
   try {
    const {title, description, author, latitude, longitude} = req.body;
   
    let foundUser = await User.findById(req.session.currentUser._id);


    let createStory =  await Story.create({title, description, author:foundUser, imgUrl:req.file.path});

    let addStoryToUser = await User.findByIdAndUpdate(foundUser._id, { $addToSet: { userStories: createStory._id } })

    res.redirect ('/story/list');
    }
    catch(error){
        console.log("error while retrieving info to create story: ", error);
    }
});

// READ
// GET Display Stories List
router.get('/list', async (req,res)=>{

    try{
        // get all story from our Database via .find() method
        let allStoriesFromDb = await Story.find();

        res.render("story/story-list", {stories: allStoriesFromDb});
    }
    catch(error){
        console.log("Error caught while getting stories: ", error)
    }


});

// READ
// GET Display Specific Story
router.get('/:storyId', async (req, res)=>{
    try{
    const {storyId}=req.params
        let specificStory = await Story.findById(storyId);
    const {currentUser} = req.session;
    let userPermission = false;

    await specificStory.populate("comments author")

    await specificStory.populate({
        path: 'comments',
        populate: {
            path: 'author',
            model: 'User'
        }

    });

    if (specificStory.author._id === currentUser._id){
        userPermission = true;
        res.render('story/story-details', {story:specificStory, userPermission});

    }
    else {
        res.render('story/story-details', {story:specificStory, userPermission});


    }
   
    }
    catch(error){
        console.log("caught an error while displaying info about a story: ", error);

    }

});

// UPDATE
// POST - Add Story to user's favorites
router.post('/:storyId', async (req, res)=>{
    
    try{
    const {storyId}=req.params
    let specificStory = await Story.findById(storyId);
    const {currentUser} = req.session;
    let userPermission = false;

    if (specificStory.author._id === currentUser._id){
        userPermission = true;
    }
    else {
        userPermission = false;
    }

    const {favorite} =req.body;

    if (favorite === 'true') {
        // Add story_id to the user's favorites
        await User.findByIdAndUpdate(currentUser._id, { $addToSet: { favorites: specificStory._id } });
    } else if (favorite === 'false') {
        // Remove story_id from the user's favorites
        await User.findByIdAndUpdate(currentUser._id, { $pull: { favorites: specificStory._id } });
    }

    res.render('story/story-details', {story:specificStory, userPermission});

    }
    catch(error){
        console.log("caught an error while displaying info about a story: ", error);

    }

});


// UPDATE
// GET Edit Story (only if currentUser is author)
router.get('/:storyId/edit', isLoggedIn,async (req,res)=>{
    try{
    const {storyId} = req.params;
    let specificStory = await Story.findById(storyId);
    let {currentUser} = req.session;

    if (specificStory.author._id === currentUser._id){
        res.render('story/story-edit', {story: specificStory})
    }
    else {
        res.redirect(`/story/${storyId}`)
    }

    }
    catch(error){
        console.log("Error caught while displaying Edit page for specific story: ",error)
    }
})

// POST - retrieve changed info and update story
router.post('/:storyId/edit',isLoggedIn, async (req,res)=>{
    
    try{
    const {storyId} = req.params;

    const {title, description} = req.body;

    await Story.findByIdAndUpdate(storyId, {title, description}, {new:true});

    res.redirect(`/story/${storyId}`);

    }
    catch(error){
        console.log(error)
    }
});

// DELETE
// POST - Delete Story (only if currentUser = author)
router.post('/:storyId/delete',isLoggedIn, async (req, res)=>{
    try{
    const {storyId}= req.params
    let specificStory = await Story.findById(storyId);
    let {currentUser} = req.session;

    if (specificStory.author._id === currentUser._id){
        await Story.findByIdAndDelete(storyId);
        res.redirect('/story/list');
    }
    else {
        res.redirect(`/story/${storyId}`)
    }

    }
    catch(error){
        console.log(error)
    }
});


// COMMENTS

// POST- Create comment from User Account

router.post('/:storyId', isLoggedIn,async (req,res) => {
    try{
        const {storyId} = req.params;
        let foundUser = await User.findById(req.session.currentUser._id);

        const {content} = req.body;

        const newComment = await Comment.create({content,author:foundUser._id});

        // Update the Story with new comment that was created

        const StoryUpdate = await Story.findByIdAndUpdate(storyId, {$push: {comments: newComment._id}});

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

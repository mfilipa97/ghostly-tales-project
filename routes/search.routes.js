// Grab Express and browser
const express = require('express');
const router = express.Router();

// Grab models and middleware
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const Story = require("../models/Story.model");


// Routes
router.get('/', async(req,res)=>{

    try{
    const {query}= req.query
    let searchUserResults = await User.find({
        username: { $regex: new RegExp(query, 'i') } // Case-insensitive username search
    });

    let searchStoryResults = await Story.find({ $or: [
        { title: { $regex: new RegExp(query, 'i') } }, // Case-insensitive title search
        { 'author.username': { $regex: new RegExp(query, 'i') } } // Case-insensitive author search
    ]
});

    res.render('search-result', {users :searchUserResults, stories:searchStoryResults})
    }
    catch(error){
        console.log(error);
    }
})



// // Function to handle the root path
// app.get('/', async function(req, res) {

//     // Access the provided 'page' and 'limt' query parameters
//     let page = req.query.page;
//     let limit = req.query.limit;

//     let articles = await Article.findAll().paginate({page: page, limit: limit}).exec();

//     // Return the articles to the rendering engine
//     res.render('index', {
//         articles: articles
//     });
// });

module.exports = router
const express = require('express');
const router = express.Router();

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");

// GET to display user profile based on Current User from Authentication
router.get("/profile", isLoggedIn, (req, res)=>{
    console.log(req.session.currentUser);
  res.render("user-profile", {userInSession: req.session.currentUser})
})

router.post ("/profile", isLoggedIn, async (req, res)=>{
    const {profileBio,profilePicUrl} = req.body;

    try{
        const userId = req.session.currentUser._id;
        console.log(userId);
        const updateUser = await User.findByIdAndUpdate(userId, {profileBio, profilePicUrl}, {new:true});
        res.redirect ("/");
    }
    catch(error){
        console.log(error)
    }
   
  });


module.exports = router;
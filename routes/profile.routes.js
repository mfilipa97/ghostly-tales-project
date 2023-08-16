const express = require('express');
const router = express.Router();

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");

// GET to display user profile based on username
router.get("/:username", isLoggedIn, async (req, res)=>{

    const {username} = req.params;

    try{

      let foundUser = await User.findOne({username});

      await foundUser.populate ('userStories');

      await foundUser.populate ('favorites');

      console.log(foundUser.userStories);

      res.render("user-profile", {foundUser})
    }
    catch(error){
      console.log("error while displaying user profile info: ", error);
    }
})

// POST - change profile bio and pic if current user matches the profile
router.post ("/:username", isLoggedIn, async (req, res)=>{

    const {username} = req.params;
    const {profileBio,profilePicUrl} = req.body;
    const userId = req.session.currentUser._id;
    let userPermission = false;

    try{

      const findUser = await User.findOne({username});
      if (findUser._id === userId){
          userPermission = true;
      }
      else {
          userPermission = false;
          return;
      }
      const updateUser = await User.findByIdAndUpdate(userId, {profileBio, profilePicUrl}, {new:true});
      res.redirect (`/profile/${username}`);
  

    }
    catch(error){
        console.log(error)
    }
   
  });

  // // POST - Delete Profile 4EVER

router.post('/:username/delete', isLoggedIn,async (req,res)=>{
  try{
    let userPermission = false;
    const {username} = req.params;
    const currentUser = req.session.currentUser._id;
    const findProfileUser = await User.findOne({username});

    console.log(findProfileUser._id);
    console.log(currentUser)

    if (findProfileUser.equals(currentUser)){

        userPermission = true;
    }
    else {
        userPermission = false;
          return;
      }
      await User.findByIdAndRemove(currentUser);
      res.redirect(`/auth/logout`)

  }
  catch(error){
      console.log(error);
  }

});




module.exports = router;
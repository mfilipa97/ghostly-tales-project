const express = require('express');
const router = express.Router();

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const fileUpLoader = require('../config/cloudinary.config');


// GET to display user profile based on username
router.get("/:username", isLoggedIn, async (req, res)=>{

    const {username} = req.params;

    try{

      let foundUser = await User.findOne({username});

      let {currentUser} =req.session;

      await foundUser.populate ('userStories');

      await foundUser.populate ('favorites');

      console.log(foundUser.userStories);

      res.render("user-profile", {foundUser,currentUser})
    }
    catch(error){
      console.log("error while displaying user profile info: ", error);
    }
})

// GET - Display profile with changeable bio and pic if current user matches the profile
router.get ("/:username/edit", isLoggedIn, async (req, res)=>{

  const {username} = req.params;
  const {currentUser} = req.session;
  const userId = currentUser._id;
  let userPermission = false;

  try{
    const findUser = await User.findOne({username: username});
    const findUserId = findUser._id
    console.log(findUser);
    console.log(userId)

    if (findUserId.equals(userId)){
        res.render ("user-profile-change", {currentUser});
    }
    else {
        return;
    }
  }
  catch(error){
      console.log(error)
  }
 
});

// POST - change profile bio and pic if current user matches the profile
router.post ("/:username/edit", fileUpLoader.single("profilePicUrl"),isLoggedIn, async (req, res)=>{

    const {username} = req.params;
    const {profileBio} = req.body;
    const userId = req.session.currentUser._id;
    let userPermission = false;

    try{

      const findUser = await User.findOne({username});
      const findUserId = findUser._id
      profilePicUrl = req.file.path;
      console.log(profilePicUrl);

      if (findUserId.equals(userId)){
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
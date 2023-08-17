const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');


const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

// Grab current User in session

/* GET home page */
router.get("/", (req, res, next) => {

  const visitedBefore = req.cookies.visitedBefore;
  const layoutOption = visitedBefore ? 'layout' : false;

  console.log("current user is: ",req.session.currentUser);
  let {currentUser} = req.session;

  if (visitedBefore) {
    // User has visited before, render regular index page
    res.render("index",{currentUser,layout: layoutOption });

  }else {
    // First-time visitor, render the landing page
    res.render('landing-page',{currentUser,layout: layoutOption }, /* { layout: false } */);
    // Set a cookie to track that the user has visited
    res.cookie('visitedBefore', 'true', { maxAge: 604800000 }); //7 days to expire
}
  
});

router.get('/about', (req,res)=>{

  res.render("about-us");
})


module.exports = router;


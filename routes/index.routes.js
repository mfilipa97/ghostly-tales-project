const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');


const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

// Grab current User in session

/* GET home page */
router.get("/", (req, res, next) => {


  console.log("current user is: ",req.session.currentUser);
  let {currentUser} = req.session;

  res.render("index", {currentUser});
});

router.get('/about', (req,res)=>{
  let {currentUser} = req.session;


  res.render("about-us", {currentUser});
})


module.exports = router;


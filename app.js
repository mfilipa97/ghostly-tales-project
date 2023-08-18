// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});


const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// Serve static files from a "public" directory
app.use(express.static("public"));

// Grab the GoogleMaps Config

const capitalize = require("./utils/capitalize");
const projectName = "ghostly-tales-project";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);
const profileRoutes = require("./routes/profile.routes");
app.use("/profile", profileRoutes);

const storyRoutes = require("./routes/story.routes");
app.use("/story", storyRoutes);

const commentRoutes = require("./routes/comment.routes");
app.use("/story", commentRoutes);

const searchRoutes = require("./routes/search.routes");
app.use("/search", searchRoutes);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);
module.exports = app;

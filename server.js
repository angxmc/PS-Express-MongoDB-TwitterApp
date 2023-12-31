const express = require("express");
require("dotenv").config();
const connectDB = require("./utils/connectDB.js");
const Tweet = require("./models/Tweet");
const manyTweets = require("./models/manytweets");
const jsxEngine = require("jsx-view-engine");
const methodOverride = require("method-override");

//* Variables
const app = express();
const PORT = process.env.PORT || 3000;

//* App Config
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

//* Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));

// - Routes -----------

/*
 * Root
 */
app.get("/", (req, res) => {
  res.send("working!");
});

//* ========== View Routes

/*
 * Index
 */
app.get("/tweets", async (req, res) => {
  try {
    const tweets = await Tweet.find({});
    res.render("Index", { tweets });
    // res.send(tweets);
  } catch (e) {
    console.log(e);
  }
});

/*
 * New
 */

app.get("/tweets/new", (req, res) => {
  res.render("New");
});

/*
 * Edit
 */
app.get("/tweets/:id/edit", async (req, res) => {
  const { id } = req.params;
  try {
    //find the tweets
    const tweet = await Tweet.findById(id);
    //return a form template with the tweet data
    res.render("Edit", { tweet });
  } catch (error) {
    console.log(error);
  }
});

/*
 * Show
 */
app.get("/tweets/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tweet = await Tweet.findById(id);
    res.render("Show", { tweet });
  } catch (e) {
    console.log(e);
  }
});

// ======== API Routes ===================

/*
 * Create POST
 */
app.post("/api/tweets", async (req, res) => {
  const createdTweet = await Tweet.create(req.body);
  res.redirect("/tweets");
});

/*
 * Update
 */
app.put("/api/tweets/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(req.body);
  if (req.body.sponsored === "on") {
    req.body.sponsored = true;
  } else {
    req.body.sponsored = false;
  }
  try {
    const updatedTweet = await Tweet.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // res.send(updatedTweet);
    res.redirect("/tweets");
  } catch (e) {
    console.log(e);
  }
});

/*
 * Delete
 */
app.delete("/api/tweets/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTweet = await Tweet.findByIdAndDelete(id);
    res.redirect("/tweets");
  } catch (e) {
    console.log(e);
  }
});

/*
 * Add Comments
 */
app.put("/api/tweets/addcomment", async (req, res) => {
  const { id } = req.params;
  const tweet = await Tweet.findById(id);
  tweet.comments.push(req.body);
  const updatedTweet = await Tweet.findByIdAndUpdate(id, tweet, { new: true });
  res.redirect(`/tweets/${id}`);
});
/**
 * * Increase Likes
 */
app.get("/api/tweets/add-like/:id", async (req, res) => {
  const { id } = req.params;
  // find the tweet to update
  const tweetToUpdate = await Tweet.findById(id);
  // increase the likes
  tweetToUpdate.likes++;
  // update the tweet with the new data
  const updatedTweet = await Tweet.findByIdAndUpdate(id, tweetToUpdate, {
    new: true,
  });
  res.redirect("/tweets");
});

/**
 * Seed Route
 */
app.get("/api/tweets/seed", async (req, res) => {
  const createdTweets = await Tweet.insertMany(manyTweets);
  res.send(createdTweets);
});

//* Listening and connecting to db
connectDB();
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

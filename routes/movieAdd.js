const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);

require("../models/Movie.js");
const Movie = mongoose.model("movies");

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/");
  }
});

router.get("/", (req, res) => {
  res.render("movieAdd")
});

router.post("/", (req, res, next) => {
  const { title, year, director, duration, genre, rate} = req.body;
  const newMovie = new Movie({ title, year, director, duration, genre, rate})
  newMovie.save()
  .then((movie) => {
    res.redirect("/movie-search");
  })
  .catch((error) => {
    console.log(error);
  })
});

module.exports = router;
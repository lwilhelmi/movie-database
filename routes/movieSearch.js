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

router.get("/", (req, res, next) => {
  res.render("movieSearch");
});

router.post("/", (req, res) => {
      Movie.find({
          $or: [{
              title: {
                "$regex": req.body.searchMovie,
                $options: "i"
              }
            },
            {
              year: {
                "$regex": req.body.searchMovie,
                $options: "i"
              } 
            },
            {       
              director: {
                "$regex": req.body.searchMovie,
                $options: "i"
              }
            },
            {
              duration: {
                "$regex": req.body.searchMovie,
                $options: "i"
              }
            },
            {
              rate: {
                "$regex": req.body.searchMovie,
                $options: "i"
              }
            }
          ]
        })
        .then(result => {
          res.render("movieSearch", {
            showMovies: result
          })
        })
        .catch((err) => {
          throw err;
        });
  });




module.exports = router;
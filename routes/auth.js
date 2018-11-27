const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


// User model
require("../models/User.js");
const User = mongoose.model("users");

router.get("/", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/", (req, res, next) => {
  const bcryptSalt     = 10;
  const username = req.body.username;
  const password = req.body.password;
  const salt     = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  if (username === "" || password === "") {
    res.render("auth/signup", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }

  User.findOne({ "username": username })
  .then(user => {
    if (user !== null) {
        res.render("auth/signup", {
          errorMessage: "The username already exists!"
        });
        return;
      }

      const newUser = User({
        username,
        password: hashPass
      });

      newUser.save()
      .then(user => {
        res.redirect("/");
      })

  })
  .catch(error => {
      next(error);
  })

});










module.exports = router;


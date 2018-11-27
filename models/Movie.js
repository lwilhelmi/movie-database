const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  year: String,
  director: String,
  duration: String,
  genre: Array,
  rate: String
});

mongoose.model("movies", movieSchema);
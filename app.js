// const createError = require("http-errors");
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const hbs = require("hbs")

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);

const app = express();


// Load routes
const login = require("./routes/loginUser");
const movieAdd = require("./routes/movieAdd");
const movieSearch = require("./routes/movieSearch");
const router = require('./routes/auth');
// const movieDisplay = require("./routes/movieDisplay");


// MongoDB connect with Mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/video");

//Handlebars Middleware - app.set
app.engine(".hbs", exphbs ({
  defaultLayout: "main",
  extname: ".hbs"
}));
app.set("view engine", "hbs");


// Load Middleware Body + Cookie parser
app.use(cookieParser())
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


//Middleware to enable sessions in express
app.use(session({
  secret: "basic-auth-secret",
  cookie: { maxAge: 60000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));


//Load Middleware Static Folder
app.use(express.static(path.join(__dirname, "public")));


// Implement routes - app.use
app.use("/", login);
app.use("/signup", router);
app.use("/movie-add", movieAdd);
app.use("/movie-search", movieSearch);
// app.use("movie-display", movieDisplay);


// //bcrypt - hash encryption
// const bcrypt     = require("bcrypt");
// const saltRounds = 10;

// const plainPassword1 = "HelloWorld";
// const plainPassword2 = "helloworld";

// const salt  = bcrypt.genSaltSync(saltRounds);
// const hash1 = bcrypt.hashSync(plainPassword1, salt);
// const hash2 = bcrypt.hashSync(plainPassword2, salt);

// console.log("Hash 1 -", hash1);
// console.log("Hash 2 -", hash2);


// Listen
const port = 3000 ;
app.listen(port, () => {
  console.log("server has started + port");
});



// Create - app.post


// Read - app.get


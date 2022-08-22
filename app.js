const express = require("express");
const app = express();
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const path = require("path");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

//require express-session
const session = require("express-session");
//requiring  and configuring mongostore
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
// require passport
require("./config/passport")(passport);

// setting passport
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);

// setting up sessions with passpot
app.use(passport.initialize());
app.use(passport.session());

//setting up morgan
if (process.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// setting up extension for handlebars
app.engine(".hbs", engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

//linking routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

//setting up static folder
app.use(express.static(path.join(__dirname, "public")));

// importing db config and running
const ConnectDB = require("./config/db");

ConnectDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`running on ${process.env.NODE_ENV} mode on ${PORT}`);
});

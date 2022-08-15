const express = require("express");
const morgan = require("morgan");
//importing router
const blogRoutes = require("./Router/blogRoutes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const { render } = require("ejs");

const port = process.env.PORT || 3000;
//express app
const app = express();
///connecting to dataBase...
const database = `mongodb+srv://mathewCodex:for12345@cluster1.avjfq.mongodb.net/node-tuts?retryWrites=true&w=majority`;
mongoose
  .connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("listening  at 3000");
    app.listen(port);
  })
  .catch((err) => console.log(err));
//register view enjine...
app.set("view engine", "ejs");
///////////
//creating a iddleware that pass a data and gives s access to our for..
app.use(bodyParser.urlencoded({ extended: true }));

//requesting morgan..
app.use(morgan("dev"));

//adding statc files
app.use(express.static("public"));

///

app.use((req, res, next) => {
  console.log("In the next middlewarae");
  next();
});

app.get("/", (req, res) => {
  res.redirect("/blogs");
});
//get request for the about page ..

//Blog Routes
app.use("/blogs", blogRoutes);
app.get("/about", (req, res) => {
  //   res.send("<p>Home page</p>");
  res.render("about", { title: "about" });
});
//404 in express..
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

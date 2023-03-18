const express = require("express");
const path = require("path");
// const engine = require('express-handlebars')
const exphbs = require("express-handlebars");
const logger = require("./Middleware/logger");
const members = require('./Members');

const app = express();

// Init Miiddleware
// app.use(logger);

// Handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.engine('handlebars', engine());
app.set("view engine", "handlebars");

// Homepage route
app.get("/", (req, res) => res.render("index", {
    title: 'Member App',
    members
}));

// Body parser middleware for post
app.use(express.json());
// Also handle form data
app.use(express.urlencoded({ extended: false }));

app.use("/api/members", require("./routes/api/members"));

// Set a static folder (use() is for middleware)- it is easily loads our files to the server
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port : ${PORT}`));

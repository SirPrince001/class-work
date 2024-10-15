const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dbConnect = require("./src/database/db");
const routes = require("./src/routes/indexRoute");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//connect to database
dbConnect();
// connect to routes
//app.use(routes);
app.use("/api/v1", routes);

module.exports = app;

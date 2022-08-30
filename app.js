const express = require("express");
const bodyParser = require("body-parser");
const indeedRouter = require("./router/indeed-router");
const glassdoorRouter = require("./router/glassdoor-route");
const linkedinRouter = require("./router/linkedin-router");
const app = express();

app.use("/api/v1/get-jobs-indeed", indeedRouter);
app.use("/api/v1/get-jobs-glassdoor", glassdoorRouter);
app.use("/api/v1/get-jobs-linkedin", linkedinRouter);

module.exports = app;

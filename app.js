const express = require("express");
const bodyParser = require("body-parser");
const indeedRouter = require("./router/indeed-router");
const glassdoorRouter = require("./router/glassdoor-route");
const linkedinRouter = require("./router/linkedin-router");
const jobRouter = require("./router/jobs-track-routes");

const app = express();
app.use(express.json());

app.use("/api/v1/get-jobs-indeed", indeedRouter);
app.use("/api/v1/get-jobs-glassdoor", glassdoorRouter);
app.use("/api/v1/get-jobs-linkedin", linkedinRouter);
app.use("/api/v1/save-job", jobRouter);

app.all("*", (req, res, next) => {
  res.status(400).json({
    message: "no such route found please check and try again",
  });
});
module.exports = app;

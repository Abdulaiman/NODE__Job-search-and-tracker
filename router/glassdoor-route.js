const express = require("express");
const { getGlassdoorJobs } = require("../controllers/glassdoor-controller");
const Router = express.Router();

Router.route("/:language").get(getGlassdoorJobs);

module.exports = Router;

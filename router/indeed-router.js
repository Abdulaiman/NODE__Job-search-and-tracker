const express = require("express");
const { getDataIndeed } = require("../controllers/indeed-controller");
const Router = express.Router();

Router.route("/:language").get(getDataIndeed);

module.exports = Router;

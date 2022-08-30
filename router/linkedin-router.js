const express = require("express");
const { getDataLinkedin } = require("../controllers/linked-in-controller");
const Router = express.Router();

Router.route("/:language").get(getDataLinkedin);

module.exports = Router;

const express = require("express");
const {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  getWaitingJobs,
  getInterviewScheduledJobs,
  getAppliedJobs,
  getAcceptedJobs,
  getInterviewedJobs,
} = require("../controllers/jobs-track-controller");
const Router = express.Router();
Router.get("/get-waiting-jobs", getWaitingJobs);
Router.get("/get-interview-scheduled-jobs", getInterviewScheduledJobs);
Router.get("/get-interviewed-jobs", getInterviewedJobs);
Router.get("/get-applied-jobs", getAppliedJobs);
Router.get("/get-accepter-jobs", getAcceptedJobs);

Router.route("/").post(createJob).get(getAllJobs);
Router.route("/:id").patch(updateJob).delete(deleteJob);

module.exports = Router;

const express = require("express");
const { protect } = require("../controllers/auth-controller");
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
  getDeclinedJobs,
  getAllJobsStats,
} = require("../controllers/jobs-track-controller");
const Router = express.Router();

Router.use(protect);

Router.get("/get-waiting-jobs", getWaitingJobs);
Router.get("/get-my-jobs-stats", getAllJobsStats);
Router.get("/get-interview-scheduled-jobs", getInterviewScheduledJobs);
Router.get("/get-interviewed-jobs", getInterviewedJobs);
Router.get("/get-applied-jobs", getAppliedJobs);
Router.get("/get-declined-jobs", getDeclinedJobs);
Router.get("/get-accepted-jobs", getAcceptedJobs);
Router.route("/").post(createJob).get(getAllJobs);
Router.route("/:id").patch(updateJob).delete(deleteJob);

module.exports = Router;

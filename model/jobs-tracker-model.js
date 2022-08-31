const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  companyName: String,
  jobTitle: String,
  anchorTag: String,
  postDate: String,
  location: String,
  description: String,
  status: {
    type: String,
    default: "waiting",
    enum: [
      "waiting",
      "applied",
      "interview-scheduled",
      "interviewed",
      "accepted",
      "declined",
    ],
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;

const Job = require("../model/jobs-tracker-model");
const catchAsync = require("../utils/catch-async");

exports.createJob = catchAsync(async (req, res, next) => {
  req.body.createdBy = req.user._id;
  const job = await Job.create(req.body);
  res.status(201).json({
    status: "success",
    job,
  });
});
exports.getAllJobs = catchAsync(async (req, res, next) => {
  const id = req.user._id;
  const jobs = await Job.aggregate([
    {
      $match: { createdBy: id },
    },
  ]);

  res.status(201).json({
    status: "success",
    jobs,
  });
});
exports.updateJob = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json({
    status: "success",
    job,
  });
});
exports.deleteJob = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await Job.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
  });
});

exports.getWaitingJobs = catchAsync(async (req, res, next) => {
  const id = req.user._id;
  const jobs = await Job.aggregate([
    {
      $match: { createdBy: id },
    },
    {
      $match: { status: "waiting" },
    },
  ]);

  res.status(200).json({
    status: "success",
    jobs,
  });
});
exports.getAppliedJobs = catchAsync(async (req, res, next) => {
  const id = req.user._id;
  const jobs = await Job.aggregate([
    {
      $match: { createdBy: id },
    },
    {
      $match: { status: "applied" },
    },
  ]);

  res.status(200).json({
    status: "success",
    jobs,
  });
});
exports.getInterviewScheduledJobs = catchAsync(async (req, res, next) => {
  const id = req.user._id;
  const jobs = await Job.aggregate([
    {
      $match: { createdBy: id },
    },
    {
      $match: { status: "interview-scheduled" },
    },
  ]);

  res.status(200).json({
    status: "success",
    jobs,
  });
});
exports.getAcceptedJobs = catchAsync(async (req, res, next) => {
  const id = req.user._id;
  const jobs = await Job.aggregate([
    {
      $match: { createdBy: id },
    },
    {
      $match: { status: "accepted" },
    },
  ]);
  res.status(200).json({
    status: "success",
    jobs,
  });
});
exports.getInterviewedJobs = catchAsync(async (req, res, next) => {
  const id = req.user._id;
  const jobs = await Job.aggregate([
    {
      $match: { createdBy: id },
    },
    {
      $match: { status: "interviewed" },
    },
  ]);
  res.status(200).json({
    status: "success",
    jobs,
  });
});

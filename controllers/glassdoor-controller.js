const { gdData } = require("../puppeteer/glassdoor-puppeteer");
const catchAsync = require("../utils/catch-async");

exports.getGlassdoorJobs = catchAsync(async (req, res, next) => {
  const language = req.params.language;
  console.log(language);
  const myData = await gdData(language);

  res.status(200).json({
    status: "success",
    myData,
  });
});

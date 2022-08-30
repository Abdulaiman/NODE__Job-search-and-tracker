const catchAsync = require("../utils/catch-async");
const { data } = require("../puppeteer/indeed-puppeteer-data");
exports.getDataIndeed = catchAsync(async (req, res, next) => {
  const language = req.params.language;
  const myData = await data(language);
  res.status(200).json({
    message: "success",
    myData,
  });
});

const catchAsync = require("../utils/catch-async");
const { dataLinkedIn } = require("../puppeteer/linked-in-puppeteer");

exports.getDataLinkedin = catchAsync(async (req, res, next) => {
  const language = req.params.language;
  const myData = await dataLinkedIn(language);
  res.status(200).json({
    message: "success",
    data: myData,
  });
});

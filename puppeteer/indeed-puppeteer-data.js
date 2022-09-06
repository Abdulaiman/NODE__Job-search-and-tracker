const puppeteer = require("puppeteer-extra");

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

exports.data = async (language) => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  // await page.setDefaultNavigationTimeout(120000);
  await page.goto(
    `https://www.indeed.com/jobs?q=${language}&sc=0kf%3Aattr(DSQF7)%3B&fromage=1`,
    {
      waitUntil: "networkidle2",
    }
  );

  const data = await page.evaluate(() => {
    const companiesName = [];
    const jobTitles = [];
    const comsLocation = [];
    const descriptions = [];
    const anchorTags = [];
    const postDates = [];
    const comNames = Array.from(document.querySelectorAll(".companyName"));
    comNames.forEach((doc) => {
      companiesName.push(doc?.childNodes[0]?.textContent);
    });
    const jobTitle = Array.from(document.querySelectorAll(".jobTitle"));
    jobTitle.forEach((doc) => {
      jobTitles.push(doc?.childNodes[0]?.childNodes[0]?.textContent);
    });
    const locations = Array.from(document.querySelectorAll(".companyLocation"));
    locations.forEach((doc) => {
      comsLocation.push(doc?.childNodes[0]?.textContent);
    });
    const description = Array.from(document.querySelectorAll(".result-footer"));
    description.forEach((doc) => {
      descriptions.push(doc?.childNodes[0]?.childNodes[0]?.textContent);
    });
    const anchorTag = Array.from(document.querySelectorAll(".jobTitle"));

    anchorTag.forEach((doc) => {
      anchorTags.push(doc?.childNodes[0]?.href);
    });
    const postDate = Array.from(document.querySelectorAll(".date"));

    postDate.forEach((doc) => {
      postDates.push(doc?.childNodes[1]?.textContent);
    });
    const data = [];
    for (let i = 0; i < jobTitles.length; i++) {
      data.push({
        companyName: companiesName[i],
        jobTitle: jobTitles[i],
        postDate: postDates[i],
        anchorTag: anchorTags[i],
        location: comsLocation[i],
        description: descriptions[i],
      });
    }
    return data;
  });
  await browser.close();
  return data;
};

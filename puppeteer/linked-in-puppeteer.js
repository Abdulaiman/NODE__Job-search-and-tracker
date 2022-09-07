const puppeteer = require("puppeteer-extra");

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

exports.dataLinkedIn = async (language) => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  // await page.setDefaultNavigationTimeout(120000);
  await page.goto(
    `https://www.linkedin.com/jobs/search?keywords=${language}&location=Worldwide&locationId=&geoId=92000000&f_TPR=r86400&f_WT=2&position=1&pageNum=0`,
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
    const comNames = Array.from(
      document.querySelectorAll(".hidden-nested-link")
    );
    comNames.forEach((doc) => {
      companiesName.push(doc?.childNodes[0]?.textContent.trim());
    });
    const jobTitle = Array.from(
      document.querySelectorAll(".base-card__full-link")
    );
    jobTitle.forEach((doc) => {
      jobTitles.push(doc?.textContent.split("\n").join(" ").trim());
    });
    const locations = Array.from(
      document.querySelectorAll(".job-search-card__location")
    );

    locations.forEach((doc) => {
      comsLocation.push(doc?.textContent.trim());
    });
    const anchorTag = Array.from(
      document.querySelectorAll(".base-card__full-link")
    );
    anchorTag.forEach((doc) => {
      anchorTags.push(doc?.href);
    });
    const postDate = Array.from(
      document.querySelectorAll(".job-search-card__listdate--new")
    );
    postDate.forEach((doc) => {
      postDates.push(doc?.textContent.trim());
    });

    const linkedinData = [];
    for (let i = 0; i < jobTitles.length; i++) {
      linkedinData.push({
        companyName: companiesName[i],
        jobTitle: jobTitles[i],
        postDate: postDates[i],
        anchorTag: anchorTags[i],
        location: comsLocation[i],
        description: "no description visit job-site for more information",
      });
    }

    return linkedinData;
  });
  await browser.close();
  return data;
};

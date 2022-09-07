const puppeteer = require("puppeteer-extra");

const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const dotenv = require("dotenv");
puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
dotenv.config({ path: "./config.env" });
exports.gdData = async (language) => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  // await page.setDefaultNavigationTimeout(120000);
  await page.goto("https://www.glassdoor.com", {
    waitUntil: "networkidle2",
  });

  await page.evaluate(() => {
    document
      .querySelector(
        "#SiteNav > nav > div.d-lg-none.d-flex.align-items-center.justify-content-between.px-std.py-xsm.px-md-lg.py-md-std.LockedHomeHeaderStyles__bottomBorder.LockedHomeHeaderStyles__fullWidth > div.d-flex.justify-content-center.order-1.order-md-2.LockedHomeHeaderStyles__flexibleContainer > button"
      )
      .click();
  });
  await page.type(
    "#LoginModal > div > div > div.modal_main.actionBarMt0 > div.fullContent > div.modal_content > div > div > form > div:nth-child(2) > label",
    `${process.env.GLASSDOOR_EMAIL}`
  );
  await page.type(
    "#LoginModal > div > div > div.modal_main.actionBarMt0 > div.fullContent > div.modal_content > div > div > form > div.mt-std.flex-grow-1.e3i3eoo2.css-p4e7a8.ew8s0qn0 > label",
    `${process.env.GLASSDOOR_PASSWORD}`
  );
  await page.click(
    "#LoginModal > div > div > div.modal_main.actionBarMt0 > div.fullContent > div.modal_content > div > div > form > div.d-flex.align-items-center.flex-column > button"
  );
  await page.goto(
    `https://www.glassdoor.com/Job/${language}-jobs-SRCH_KO0,5.htm?fromAge=1`,
    {
      waitUntil: "networkidle2",
    }
  );
  const glassdoorData = await page.evaluate(() => {
    const companiesName = [];
    const jobTitles = [];
    const comsLocation = [];
    const anchorTags = [];
    const postDates = [];

    const comsNames = Array.from(document.querySelectorAll(".e1n63ojh0"));
    comsNames.forEach((com) =>
      companiesName.push(com.childNodes[0].textContent)
    );
    const jobTitle = Array.from(document.querySelectorAll(".eigr9kq1"));
    jobTitle.forEach((com) => jobTitles.push(com.childNodes[0].textContent));
    const jobLocation = Array.from(document.querySelectorAll(".e1rrn5ka4"));
    jobLocation.forEach((com) =>
      comsLocation.push(com.childNodes[0].textContent)
    );
    const postDate = Array.from(document.querySelectorAll(".css-17n8uzw"));
    postDate.forEach((com) => postDates.push(com.textContent));

    const anchorTag = Array.from(document.querySelectorAll(".eigr9kq1"));
    anchorTag.forEach((com) => anchorTags.push(com.href));
    const glassdoorJobs = [];
    for (let i = 0; i < companiesName.length; i++) {
      glassdoorJobs.push({
        companyName: companiesName[i],
        jobTitle: jobTitles[i],
        postDate: postDates[i],
        anchorTag: anchorTags[i],
        location: comsLocation[i],
        description: "no description, visit the job-site for more information",
      });
    }
    return glassdoorJobs;
  });
  await browser.close();
  return glassdoorData;
};

var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    // prettier-ignore
const LIMIT = 50
const URL = `https://maplestory.nexon.com/News/Notice?page=${LIMIT}`;


//In a Node.js file, require it:

const puppeteer = require("puppeteer");

//then we can use the launch() method to create a browser instance:
(async () => {

  //headless: true => 브라우저 실행 X
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  //Next we can use the newPage() method on the browser object to get the page object:
  const page = await browser.newPage();
  await page.goto("https://maplestory.nexon.com/News/Notice");

  
  const newsBoardImgae = await page.evaluate(() => {
    let elements = Array.from(document.querySelectorAll(".news_board > ul > li > p > a > em > img"));
    let links = elements.map(element => {
      return element.getAttribute('src');
    })
    return links;
  });
  console.log(newsBoardImgae);


  const newsBoardContent = await page.evaluate(() => {
    let elements = Array.from(document.querySelectorAll(".news_board > ul > li > p"));
    let links = elements.map(element => {
      return element.innerText;
    })
    return links;
  });
  console.log(newsBoardContent);


  const newsCreatedDate = await page.evaluate(() => {
    let elements = Array.from(document.querySelectorAll(".heart_date"));
    let links = elements.map(element => {
      return element.innerText;
    })
    return links;
  });
  console.log(newsCreatedDate.length);


  const newsBoardHref = await page.evaluate(() => {
    let elements = Array.from(document.querySelectorAll(".news_board > ul > li > p > a"));
    let links = elements.map(element => {
      return  `https://maplestory.nexon.com/${element.getAttribute('href')}`;
    })
    return links;
  });
  console.log(newsBoardHref);


  const newsPages = await page.evaluate(() => {
    let elements = Array.from(document.querySelectorAll(".page_numb > a"));
    return elements.length
  });
  console.log(newsPages);

  res.send({'newsBoardImgae':newsBoardImgae, 'newsBoardContent':newsBoardContent, 'newsCreatedDate.length':newsCreatedDate.length, 'newsBoardHref':newsBoardHref, 'newsPages':newsPages});
  await browser.close();
})();
});
module.exports = router;
const functions = require('firebase-functions');
const universal = require(process.cwd() + '/dist/mystore/server/main.js').app();
const chromium = require('chrome-aws-lambda');

exports.spartacusUniversalTwo = functions
  .runWith({
    memory: '2GB',
  })
  .https.onRequest(universal);

exports.chromeHeadless = functions
  .runWith({
    memory: '2GB',
  })
  .https.onRequest(async (request, response) => {
    let result = null;
    let browser = null;

    try {
      browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
      });
      let page = await browser.newPage();
      await page.goto(request.query.url || 'https://github.com', {
        waitUntil: 'networkidle0',
      });

      result = await page.content();
    } catch (error) {
      throw new Error(error);
    } finally {
      if (browser !== null) {
        await browser.close();
      }
    }

    response.send(result);
  });

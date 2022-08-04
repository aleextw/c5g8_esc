const { By, Key, Builder, until } = require("selenium-webdriver");
require("chromedriver");
async function valid_data() {

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  //To wait for browser to build and launch properly
  let driver = await new Builder().forBrowser("chrome").build();

  // Step 1 -To fetch our server from the browser with our code.
  await driver.get("https://c5g8-esc.onrender.com");
  await driver.manage().setTimeouts({ implicit: 10000 });
  console.info(await driver.manage().getTimeouts());
  // load search input bar then continue
  let inputBar = driver.findElement(By.name("dest_input"));
  await inputBar.click();
  await inputBar.clear();
  await sleep(3000);

  // Step 2 - enter destination input
  await inputBar.sendKeys("sh");
  let autocomplete = driver.findElement(By.name("dest_suggestions"));
  await driver.wait(until.elementIsVisible(autocomplete), 5000);

  // Step 3 - use arrow keys to navigate down to choice
  await inputBar.sendKeys(Key.ARROW_DOWN);
  await inputBar.sendKeys(Key.ENTER);
}
valid_data();

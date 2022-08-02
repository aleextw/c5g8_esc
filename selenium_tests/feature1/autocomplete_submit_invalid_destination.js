const { By, Key, Builder, until } = require("selenium-webdriver");
require("chromedriver");

async function test1() {
  /* 
  
  */

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  //To wait for browser to build and launch properly
  let driver = await new Builder().forBrowser("chrome").build();

  // Step 1 -To fetch our server from the browser with our code.
  await driver.get("https://localhost:3000");
  await driver.manage().setTimeouts({ implicit: 10000 });
  console.info(await driver.manage().getTimeouts());
  // load search input bar then continue
  let inputBar = driver.findElement(By.name("dest_input"));
  await inputBar.click();
  await inputBar.clear();
  await sleep(3000);

  // Step 2 - enter destination input
  await inputBar.sendKeys("shh");
  let autocomplete = driver.findElement(By.name("dest_suggestions"));
  await driver.wait(until.elementIsVisible(autocomplete), 5000);

  // Step 3 - use arrow keys to navigate down to choice
  // await inputBar.sendKeys(Key.ARROW_DOWN);
  // await inputBar.sendKeys(Key.ARROW_DOWN);
  // await inputBar.sendKeys(Key.ENTER);

  // Step 4 - select datepicker input
  let datePicker = driver.findElement(By.name("date_picker"));
  await datePicker.click();
  await sleep(1000);

  // TODO: Fix inability to click on dates in datepicker
  //   // Step 5 - select dates of stay
  //   let date1 = driver.findElement(
  //     By.xpath('//*[contains(.,"Sat Jul 30 2022")]')
  //   );
  //   let date2 = driver.findElement(By.xpath('//*[contains(.,"Mon Aug 1 2022")]'));
  //   await date1.click();
  //   await sleep(1000);
  //   await date2.click();

  // Step 6 - select room count input
  let roomCount = driver.findElement(By.name("rooms"));
  await roomCount.click();
  await sleep(1000);
  await roomCount.sendKeys(Key.ARROW_DOWN);
  await roomCount.sendKeys(Key.ENTER);

  // Step 7 - select room count input
  let adultCount = driver.findElement(By.name("num_adults"));
  await adultCount.click();
  await sleep(1000);
  await adultCount.sendKeys(Key.ARROW_UP);
  await adultCount.sendKeys(Key.ENTER);

  // Step 8 - select room count input
  let childrenCount = driver.findElement(By.name("num_children"));
  await childrenCount.click();
  await sleep(1000);
  await childrenCount.sendKeys(Key.ARROW_DOWN);
  await childrenCount.sendKeys(Key.ARROW_DOWN);
  await childrenCount.sendKeys(Key.ENTER);

  // Step 9 - submit
  await driver.findElement(By.name("dest_search_submit")).click();
  console.log(
    `Error caught for ${await inputBar.getAttribute(
      "value"
    )} in DestinationSearch for HBS`
  );
  await sleep(5000);
  await driver.close();
}

// passed
test1();
// run w ` node ____.js `

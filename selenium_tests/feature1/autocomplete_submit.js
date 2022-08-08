const { By, Key, Builder, until } = require("selenium-webdriver");
require("chromedriver");

async function valid_data() {
  /* 
  Should transition to feature 2 (hotels) given valid data
  */
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  // To wait for browser to build and launch properly
  let driver = await new Builder().forBrowser("chrome").build();

  // Step 1 -To fetch our server from the browser with our code.
  await driver.get("https://c5g8-esc.onrender.com");
  await driver.manage().setTimeouts({ implicit: 10000 });
  console.info(await driver.manage().getTimeouts());
  // get search input bar
  await driver.sleep(5000);
  let inputBar = driver.findElement(By.name("dest_input"));
  await inputBar.click();
  await inputBar.clear();
  await driver.sleep(3000);

  // Step 2 - enter destination input
  await inputBar.sendKeys("s");
  await driver.sleep(500);
  await inputBar.sendKeys("i");
  await driver.sleep(500);


  // Step 3 - use arrow keys to navigate down to choice
  await inputBar.sendKeys(Key.ARROW_DOWN);
  await driver.sleep(1000);
  await inputBar.sendKeys(Key.ARROW_DOWN);
  await driver.sleep(1000);
  await inputBar.sendKeys(Key.ENTER);

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
  console.log(
    `Search entered successfully for ${await inputBar.getAttribute(
      "value"
    )} in DestinationSearch for HBS`
  );
  await driver.findElement(By.name("dest_search_submit")).click();
  await sleep(15000);
  await driver.close();
}

// passed
valid_data();
// run w ` node ____.js `

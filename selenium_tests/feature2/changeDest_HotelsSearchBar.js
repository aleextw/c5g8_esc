const {By,Key,Builder, until} = require("selenium-webdriver");
require("chromedriver");

async function test(){
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();
  
    // Step 1 - To fetch our server from the browser with our code.
    await driver.get("https://localhost:3000/hotels?destination=Singapore,%20Singapore&dest_uid=RsBU&checkInDate=2022-07-24&checkOutDate=2022-07-25&numRooms=1&numAdults=2&numChildren=0&currency=SGD");
    await driver.manage().setTimeouts({ implicit: 10000 });
    console.info(await driver.manage().getTimeouts());
  
    // load HotelCards then continue
    let hotelCards = driver.findElement(By.name("HotelCard"));
    await sleep(5000);
    await driver.findElement(By.name("HotelsSearchBar")).click();
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

    // submit
    await driver.findElement(By.name("dest_search_submit")).click();
    console.log(
        `Search entered successfully for ${await inputBar.getAttribute(
        "value"
        )} in DestinationSearch for HBS`
    );
    await sleep(30000);
    await driver.close();
    
    
     //It is always a safe practice to quit the browser after execution
     await driver.quit();

}

test();
// run w ` node a_example.js `
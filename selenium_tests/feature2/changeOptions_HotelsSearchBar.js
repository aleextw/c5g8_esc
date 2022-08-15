const {By,Key,Builder, until} = require("selenium-webdriver");
require("chromedriver");

async function test(){
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();
  
    // Step 1 - To fetch our server from the browser with our code.
    await driver.get("https://c5g8-esc.onrender.com/hotels?destination=Singapore,%20Singapore&dest_uid=RsBU&checkInDate=2022-08-24&checkOutDate=2022-08-25&numRooms=1&numAdults=2&numChildren=0&currency=SGD");
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

    // enter same destination (Singapore)
    await inputBar.sendKeys("Singapore");
    let autocomplete = driver.findElement(By.name("dest_suggestions"));
    await driver.wait(until.elementIsVisible(autocomplete), 5000);
    await inputBar.sendKeys(Key.ENTER);

    // Step 2 - select room count input
    let roomCount = driver.findElement(By.name("rooms"));
    await roomCount.click();
    await sleep(1000);
    await roomCount.sendKeys(Key.ARROW_DOWN);
    await roomCount.sendKeys(Key.ENTER);

    // Step 3 - select adult count input
    let adultCount = driver.findElement(By.name("num_adults"));
    await adultCount.click();
    await sleep(1000);
    await adultCount.sendKeys(Key.ARROW_DOWN);
    await adultCount.sendKeys(Key.ARROW_DOWN);
    await adultCount.sendKeys(Key.ENTER);

    // Step 4 - select children count input
    let childrenCount = driver.findElement(By.name("num_children"));
    await childrenCount.click();
    await sleep(1000);
    await childrenCount.sendKeys(Key.ARROW_DOWN);
    await childrenCount.sendKeys(Key.ENTER);

    // submit
    await driver.findElement(By.name("dest_search_submit")).click();
    console.log(
        `Options changed successfully in DestinationSearch for HBS`
    );
    await sleep(30000);
    await driver.close();
    
    
     //It is always a safe practice to quit the browser after execution
     await driver.quit();

}

test();
// run w ` node a_example.js `
const {By,Key,Builder, until} = require("selenium-webdriver");
require("chromedriver");

async function test(){
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();
    
    // Step 1 -To fetch our server from the browser with our code.
    await driver.get("http://localhost:3000");
    await driver.manage().setTimeouts({ implicit: 10000 });
    console.info(await driver.manage().getTimeouts());
    // load search input bar then continue
    let inputBar = driver.findElement(By.name("dest_input"));
    await inputBar.click();
    await inputBar.clear();
    await sleep(3000);

    // Step 2 - enter destination input
    await inputBar.sendKeys("sing");
    let autocomplete = driver.findElement(By.name("dest_suggestions"));
    await driver.wait(until.elementIsVisible(autocomplete), 5000);
    // submit
    await driver.findElement(By.name("dest_search_submit")).click();
    console.log(
        `Search entered successfully for ${await inputBar.getAttribute(
        "value"
        )} in DestinationSearch for HBS`
    );
    await driver.manage().setTimeouts({ implicit: 10000 });
    console.info(await driver.manage().getTimeouts());
    // load HotelCards then continue
    let hotelCards = driver.findElement(By.name("HotelCard"));
    
    // Step 3- choose Hotel
    await driver.findElement(By.name("button_bookHotel")).click();
    console.log(
        `Hotel chosen successfully in HotelSearchResults for HBS`
    );
    
    await driver.manage().setTimeouts({ implicit: 5000 });
    console.info(await driver.manage().getTimeouts());
    
    // load RoomCards then continue
    let RoomCard = driver.findElement(By.name("RoomCard"));
    console.log("Sleeping")
    await sleep(5000);

    await driver.executeScript("arguments[0].scrollIntoView();", RoomCard)

    // Step 4 - choose room
    await driver.findElement(By.name("button_bookRoom")).click();
    console.log(
        `Room chosen successfully in ViewHotelDetails for HBS`
    );
    await sleep(5000);

    // Step 5 - full in details
    
    await driver.close();
    
     //It is always a safe practice to quit the browser after execution
     await driver.quit();

}

test();
// run w ` node a_example.js `
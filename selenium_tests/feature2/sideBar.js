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
    
    await driver.sleep(until.elementIsVisible(driver.findElement(By.name("button_bookHotel"))));
    await driver.sleep(5000);
    
    // Hotel search
    let hotelSearch = await driver.findElement(By.name("HotelSearchInput"));
    await hotelSearch.click();
    await hotelSearch.sendKeys(Key.CONTROL,"a",Key.DELETE);
    await hotelSearch.sendKeys("r","e","g","i","s");
    await driver.sleep(3000);
    
    await hotelSearch.click();
    await hotelSearch.sendKeys(Key.CONTROL,"a",Key.DELETE);
    await hotelSearch.sendKeys("r","o","a","d");
    await driver.sleep(3000);
    // clear inputs
    await hotelSearch.click();
    await hotelSearch.sendKeys(Key.CONTROL,"a",Key.DELETE);
    await driver.sleep(3000);

    console.log("Test filters")
    // Review score filter
    let reviewRange = await driver.findElement(By.name("reviewRange")).click();
    await driver.sleep(3000);

    // Price range filter
    let priceRange = await driver.findElement(By.name("priceRange")).click();
    await driver.sleep(3000);

    // Star rating filter
    let starRange = await driver.findElement(By.name("starRange")).click();
    await driver.sleep(5000);

    // reset 
    // TODO: FIX reset button if possible (filter slider + selector)
    await driver.findElement(By.name("resetButton")).click();
    
    console.log("Test sorting")
    // sort by 
    let sorting = await driver.findElement(By.name("sorting"));
    // price low to high
    await sorting.click();
    await sorting.sendKeys(Key.ARROW_DOWN, Key.ENTER);
    await driver.sleep(3000);
    // price high to low
    await sorting.click();
    await sorting.sendKeys(Key.ARROW_DOWN, Key.ENTER);
    await driver.sleep(3000);
    // stars low to high
    await sorting.click();
    await sorting.sendKeys(Key.ARROW_DOWN, Key.ENTER);
    await driver.sleep(3000);
    // stars high to low
    await sorting.click();
    await sorting.sendKeys(Key.ARROW_DOWN, Key.ENTER);
    await driver.sleep(3000);
    // distance
    await sorting.click();
    await sorting.sendKeys(Key.ARROW_DOWN, Key.ENTER);
    await driver.sleep(3000);
    
    
    
    // Choose Hotel
    await driver.findElement(By.name("button_bookHotel")).click();
    console.log(
        `Hotel chosen successfully in HotelSearchResults for HBS`
    );
    await driver.sleep(until.elementIsVisible(driver.findElement(By.name("RoomCard"))));
    await driver.close();
    
     //It is always a safe practice to quit the browser after execution
     await driver.quit();

}

test();
// run w ` node a_example.js `
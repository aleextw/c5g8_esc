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
    console.log("Sleeping for 10s")
    await sleep(10000);
    
    // Choose Hotel
    await driver.findElement(By.name("button_bookHotel")).click();
    console.log(
        `Hotel chosen successfully in HotelSearchResults for HBS`
    );
    await sleep(5000);
    await driver.close();
    
     //It is always a safe practice to quit the browser after execution
     await driver.quit();

}

test();
// run w ` node a_example.js `
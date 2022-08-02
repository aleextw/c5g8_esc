const {By,Key,Builder, until} = require("selenium-webdriver");
require("chromedriver");

async function test(){
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();
    
    // Step 1 -To fetch our server from the browser with our code.
    await driver.get("https://localhost:3000/hotel?hotel_uid=WaXd&destination=Singapore,%20Singapore&dest_uid=RsBU&checkInDate=2022-07-24&checkOutDate=2022-07-25&numRooms=1&numAdults=2&numChildren=0&currency=SGD");
        
    await driver.manage().setTimeouts({ implicit: 5000 });
    console.info(await driver.manage().getTimeouts());
    
    // load RoomCards then continue
    let RoomCard = driver.findElement(By.name("RoomCard"));
    console.log("Sleeping")
    await sleep(5000);

    // Step 2 - choose room
    await driver.findElement(By.name("button_bookRoom")).click();
    console.log(
        `Room chosen successfully in ViewHotelDetails for HBS`
    );
    await sleep(5000);
    await driver.close();
    
     //It is always a safe practice to quit the browser after execution
     await driver.quit();

}

test();
// run w ` node a_example.js `
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
    console.log(
        `Search entered successfully for ${await inputBar.getAttribute(
        "value"
        )} in DestinationSearch for HBS`
    );
    await driver.findElement(By.name("dest_search_submit")).click();
    
    await driver.manage().setTimeouts({ implicit: 5000 });
    console.info(await driver.manage().getTimeouts());
    // load HotelCards then continue
    let hotelCards = await driver.findElement(By.name("HotelCard"));
    await driver.sleep(2000);
    // Step 3- choose Hotel
    await driver.findElement(By.name("button_bookHotel")).click();
    console.log(
        `Hotel chosen successfully in HotelSearchResults for HBS`
    );
    
    await driver.sleep(5000);
    console.log("Scroll to rooms");
    await driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(By.name("RoomCard")));

    await driver.sleep(5000);

    // Step 4 - choose room
    await driver.findElement(By.name("button_bookRoom")).click();
    console.log(
        `Room chosen successfully in ViewHotelDetails for HBS`
    );
    
    await sleep(5000);

    // Step 5 - full in details
    let salutation = await driver.findElement(By.name("salutation"));
    await salutation.click();
    await salutation.sendKeys(Key.ARROW_DOWN);
    await salutation.sendKeys(Key.ENTER);
    
    await driver.findElement(By.name("firstName")).sendKeys("Selena");
    await driver.findElement(By.name("lastName")).sendKeys("Test");
    await driver.findElement(By.name("email")).sendKeys("test@gmail.com");
    await driver.findElement(By.name("number")).sendKeys("12345678");
    await driver.findElement(By.name("message")).sendKeys("Anniversary Celebration, please prepare a cake!");

    await driver.findElement(By.name("cardName")).sendKeys("Selena Test");
    await driver.findElement(By.name("cardNumber")).sendKeys("1234567812345678");
    await driver.findElement(By.name("expiry")).sendKeys("03/27");
    await driver.findElement(By.name("CVV")).sendKeys("123");
    await driver.findElement(By.name("billingAddress")).sendKeys("123456")
    await driver.findElement(By.name("button_confirmBooking")).click();
    console.log(
        `Details filled in successfully in BookingDetails for HBS`
    );
    
    await sleep(5000);

    await driver.findElement(By.name("copyBookingRef")).click();
    await sleep(2000);
    await driver.findElement(By.name("button_viewBooking")).click();
    await sleep(2000);
    await driver.findElement(By.name("booking_uid")).click();
    await driver.findElement(By.name("booking_uid")).sendKeys(Key.CONTROL,'v');
    await driver.sleep(2000);
    await driver.findElement(By.name("button_findBooking")).click();
    console.log(
        `Booking UID/ref retrieved for HBS`
    );
    
    await driver.sleep(5000);

    await driver.close();
    
     //It is always a safe practice to quit the browser after execution
     await driver.quit();

}

test();
// run w ` node a_example.js `
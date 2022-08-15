const {By,Key,Builder, until} = require("selenium-webdriver");
require("chromedriver");

async function test(){
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();
    
    // Step 1 -To fetch our server from the browser with our code.
    await driver.get("https://c5g8-esc.onrender.com");
    await driver.manage().setTimeouts({ implicit: 5000 });
    console.info(await driver.manage().getTimeouts());
    
    await driver.findElement(By.name("button_viewBooking")).click();
    await sleep(2000);
    await driver.findElement(By.name("input_booking_uid")).click();
    await driver.findElement(By.name("input_booking_uid")).sendKeys("00EgQ6dc66z8SMP_nAUpptRQRsqhx0DuE_FVRp37BYc");
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
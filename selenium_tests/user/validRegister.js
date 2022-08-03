const {By,Key,Builder, until, WebDriver} = require("selenium-webdriver");
require("chromedriver");

async function test(){
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();
    
    // Step 1 -To fetch our server from the browser with our code.
    await driver.get("https://c5g8-esc.onrender.com");
        
    await driver.manage().setTimeouts({ implicit: 5000 });
    console.info(await driver.manage().getTimeouts());
    await driver.sleep(10000);

    // get Register button
    let RegisterButton = driver.findElement(By.name("button_register"));
    console.log("Found register button");

    // click on Register button
    await RegisterButton.click();
    console.log("Clicked on register button");
    await driver.sleep(5000);

    // fill out details on Register page
    await driver.findElement(By.name("firstNameInput")).sendKeys("testFirstName");
    await driver.findElement(By.name("lastNameInput")).sendKeys("testLasttName");
    await driver.findElement(By.name("emailInput")).sendKeys("test2email@123.com");
    await driver.findElement(By.name("numberInput")).sendKeys("94345678");
    await driver.findElement(By.name("usernameInput")).sendKeys("testuser002");
    await driver.findElement(By.name("passwordInput")).sendKeys("testpw123");
    await sleep(3000);
    console.log("Filled out valid details");

    // click on register button
    await driver.findElement(By.name("registerUser")).click();

    // explicitly wait until registration is complete and user is routed back to homepage
    await driver.wait(until.elementIsVisible(await driver.findElement(By.name("dest_search_submit"))), 10000);
    console.log("User has successfully registered!");

    await driver.sleep(5000);
    await driver.close();
    
     //It is always a safe practice to quit the browser after execution
     await driver.quit();

}

test();
// run w ` node a_example.js `
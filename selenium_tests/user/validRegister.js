const {By,Key,Builder, until, WebDriver} = require("selenium-webdriver");
require("chromedriver");

async function test(){
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();
    
    // Step 1 -To fetch our server from the browser with our code.
    await driver.get("http://localhost:3000/");
        
    await driver.manage().setTimeouts({ implicit: 5000 });
    console.info(await driver.manage().getTimeouts());

    // get Register button
    let RegisterButton = driver.findElement(By.name(""));
    console.log("found register button");

    // click on Register button

    await RegisterButton.click();
    console.log("clicked on register button");
    await sleep(5000);

    // fill out details on Register page
    await driver.findElement(By.name("firstNameInput")).sendKeys("testFirstName");
    await driver.findElement(By.name("lastNameInput")).sendKeys("testLasttName");
    await driver.findElement(By.name("emailInput")).sendKeys("testemail@123.com");
    await driver.findElement(By.name("numInput")).sendKeys("12345678");
    await driver.findElement(By.name("usernameInput")).sendKeys("testuser123");
    await driver.findElement(By.name("passwordInput")).sendKeys("testpw123");
    console.log("filled out valid details");

    // click on register button
    await driver.findElement(By.name("registerButton")).click();

    // explicitly wait until registration is complete and user is routed back to homepage
    await driver.wait(until.elementIsVisible(await driver.findElement(By.name("dest_search_submit"))), 10000);
    console.log("user has successfully registered!");

    await sleep(5000);
    await driver.close();
    
     //It is always a safe practice to quit the browser after execution
     await driver.quit();

}

test();
// run w ` node a_example.js `
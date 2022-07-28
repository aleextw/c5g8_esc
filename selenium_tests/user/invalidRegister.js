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

    console.log("click on Register button with all empty fields");
    await driver.findElement(By.name("registerButton")).click();
    console.log("clicked on register button");
    try{
        await driver.wait(until.elementIsVisible(await driver.findElement(By.name("registrationErrorMsg"), )));
        let msg = await driver.findElement(By.name("registrationErrorMsg"));
        console.log("error successfully detected, error message shown: ", msg);
        
    }
    catch(error) {
        console.log("no error message shown");
    }

    await sleep(5000);

    // fill out invalid details on Register page:

    console.log("testing invalid firstName: contains non alphabets"); 
    await driver.findElement(By.name("firstNameInput")).sendKeys("invalidFirstName1234!!");
    await driver.findElement(By.name("lastNameInput")).sendKeys("testLasttName");
    await driver.findElement(By.name("emailInput")).sendKeys("testemail@123.com");
    await driver.findElement(By.name("numInput")).sendKeys("12345678");
    await driver.findElement(By.name("usernameInput")).sendKeys("testuser123");
    await driver.findElement(By.name("passwordInput")).sendKeys("testpw123");
    // click on register button
    await driver.findElement(By.name("registerButton")).click();
    // check if registration error occurs
    try{
        await driver.wait(until.elementIsVisible(await driver.findElement(By.name("registrationErrorMsg"), )));
        let msg = await driver.findElement(By.name("registrationErrorMsg"));
        console.log("error successfully detected, error message shown: ", msg);
        
    }
    catch(error) {
        console.log("no error message shown");
    }

    console.log("testing invalid lastName: contains non alphabets"); 
    await driver.findElement(By.name("firstNameInput")).sendKeys("testFirstName");
    await driver.findElement(By.name("lastNameInput")).sendKeys("testLasttName1234!!");
    await driver.findElement(By.name("emailInput")).sendKeys("testemail@123.com");
    await driver.findElement(By.name("numInput")).sendKeys("12345678");
    await driver.findElement(By.name("usernameInput")).sendKeys("testuser123");
    await driver.findElement(By.name("passwordInput")).sendKeys("testpw123");
    // click on register button
    await driver.findElement(By.name("registerButton")).click();
    // check if registration error occurs
    try{
        await driver.wait(until.elementIsVisible(await driver.findElement(By.name("registrationErrorMsg"), )));
        let msg = await driver.findElement(By.name("registrationErrorMsg"));
        console.log("error successfully detected, error message shown: ", msg);
        
    }
    catch(error) {
        console.log("no error message shown");
    }

    console.log("testing: invalid email: contains non alphanumeric and no @");
    await driver.findElement(By.name("firstNameInput")).sendKeys("testFirstName");
    await driver.findElement(By.name("lastNameInput")).sendKeys("testLasttName");
    await driver.findElement(By.name("emailInput")).sendKeys("!#$%^&123.com");
    await driver.findElement(By.name("numInput")).sendKeys("12345678");
    await driver.findElement(By.name("usernameInput")).sendKeys("testuser123");
    await driver.findElement(By.name("passwordInput")).sendKeys("testpw123");
    // click on register button
    await driver.findElement(By.name("registerButton")).click();
    // check if registration error occurs
    try{
        await driver.wait(until.elementIsVisible(await driver.findElement(By.name("registrationErrorMsg"), )));
        let msg = await driver.findElement(By.name("registrationErrorMsg"));
        console.log("error successfully detected, error message shown: ", msg);
        
    }
    catch(error) {
        console.log("no error message shown");
    }

    console.log("testing: invalid number: contains non integers");
    await driver.findElement(By.name("firstNameInput")).sendKeys("testFirstName");
    await driver.findElement(By.name("lastNameInput")).sendKeys("testLasttName");
    await driver.findElement(By.name("emailInput")).sendKeys("testemail@123.com");
    await driver.findElement(By.name("numInput")).sendKeys("124asfs!5678");
    await driver.findElement(By.name("usernameInput")).sendKeys("testuser123");
    await driver.findElement(By.name("passwordInput")).sendKeys("testpw123");
    // click on register button
    await driver.findElement(By.name("registerButton")).click();
    // check if registration error occurs
    try{
        await driver.wait(until.elementIsVisible(await driver.findElement(By.name("registrationErrorMsg"), )));
        let msg = await driver.findElement(By.name("registrationErrorMsg"));
        console.log("error successfully detected, error message shown: ", msg);
        
    }
    catch(error) {
        console.log("no error message shown");
    }
    
    
    console.log("all invalid registration tests successfully completed!");
    await sleep(5000);
    await driver.close();
    
     //It is always a safe practice to quit the browser after execution
     await driver.quit();

}

test();
// can include selective empty fields test, some valid-some invalid tests"
// run w ` node a_example.js `
const {By,Key,Builder, until, WebDriver} = require("selenium-webdriver");
require("chromedriver");

async function test(){
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();
    
    // Step 1 -To fetch our server from the browser with our code.
    await driver.get("https://localhost:3000/");
        
    await driver.manage().setTimeouts({ implicit: 5000 });
    console.info(await driver.manage().getTimeouts());
    await driver.sleep(10000);
    
    // get Register button
    let RegisterButton = driver.findElement(By.name("button_register"));
    console.log("Found register button");

    // click on Register button
    await RegisterButton.click();
    console.log("Clicked on register button");
    await sleep(5000);

    console.log("click on Register button with all empty fields");
    await driver.findElement(By.name("registerUser")).click();
    console.log("clicked on register button");

    await driver.sleep(5000);

    // fill out invalid details on Register page:
    console.log("testing invalid firstName: contains non alphabets"); 
    let firstNameInput = await driver.findElement(By.name("firstNameInput"));
    let lastNameInput = await driver.findElement(By.name("lastNameInput"));
    let emailInput = await driver.findElement(By.name("emailInput"));
    let phoneNumberInput = await driver.findElement(By.name("numberInput"));
    let usernameInput = await driver.findElement(By.name("usernameInput"));
    let passwordInput = await driver.findElement(By.name("passwordInput"));
    let registerUserButton = await driver.findElement(By.name("registerUser"));
    
    await firstNameInput.click();
    await firstNameInput.sendKeys("invalidFirstName1234!!");
    await lastNameInput.click();
    await lastNameInput.sendKeys("testLasttName");
    await emailInput.click();
    await emailInput.sendKeys("testInvalid2@123.com");
    await phoneNumberInput.click();
    await phoneNumberInput.sendKeys("98843352");
    await usernameInput.click();
    await usernameInput.sendKeys("testInvalid003");
    await passwordInput.click();
    await passwordInput.sendKeys("testpw123");
    await driver.sleep(2000);
    await driver.findElement(By.name("showPassword")).click();
    await driver.sleep(2000);
    // click on register button
    await registerUserButton.click();
    // check if registration error occurs
    
    
    await driver.sleep(2000);
    console.log("testing invalid lastName: contains non alphabets"); 
    await firstNameInput.click();
    await firstNameInput.sendKeys(Key.CONTROL,'a',Key.DELETE);
    await firstNameInput.sendKeys("testFirstName");
    await lastNameInput.click();
    await lastNameInput.sendKeys(Key.CONTROL,'a',Key.DELETE);
    await lastNameInput.sendKeys("testLasttName1234!!");
    await driver.sleep(2000);
    // click on register button
    await registerUserButton.click();
    // check if registration error occurs
    
    
    await driver.sleep(2000);
    console.log("testing: invalid email: contains non alphanumeric and no @");
    await lastNameInput.click();
    await lastNameInput.sendKeys(Key.CONTROL,'a',Key.DELETE);
    await lastNameInput.sendKeys("testLasttName");
    await emailInput.click();
    await emailInput.sendKeys(Key.CONTROL,'a',Key.DELETE);
    await emailInput.sendKeys("!#$%^&123.com");
    await driver.sleep(2000);
    // click on register button
    await registerUserButton.click();
    // check if registration error occurs
    
    await driver.sleep(2000);
    console.log("testing: already registered email");
    await emailInput.click();
    await emailInput.sendKeys(Key.CONTROL,'a',Key.DELETE);
    await emailInput.sendKeys("testInvalid@123.com");
    await driver.sleep(2000);
    // click on register button
    await registerUserButton.click();
    // check if registration error occurs

    await driver.sleep(2000);
    console.log("testing: already registered number");
    await phoneNumberInput.click();
    await phoneNumberInput.sendKeys(Key.CONTROL,'a',Key.DELETE);
    await phoneNumberInput.sendKeys("12345678");
    await driver.sleep(2000);
    // click on register button
    await registerUserButton.click();
    // check if registration error occurs


    await driver.sleep(2000);
    console.log("testing: invalid username: taken");
    await phoneNumberInput.click();
    await phoneNumberInput.sendKeys(Key.CONTROL,'a',Key.DELETE);
    await phoneNumberInput.sendKeys("98843352");
    await usernameInput.click();
    await usernameInput.sendKeys(Key.CONTROL,'a',Key.DELETE);
    await usernameInput.sendKeys("testuser123")
    await driver.sleep(2000);
    // click on register button
    await registerUserButton.click();
    // check if registration error occurs
    
    
    console.log("all invalid registration tests successfully completed!");
    await driver.sleep(5000);
    await driver.close();
    
     //It is always a safe practice to quit the browser after execution
     await driver.quit();

}

test();
// can include selective empty fields test, some valid-some invalid tests"
// run w ` node a_example.js `
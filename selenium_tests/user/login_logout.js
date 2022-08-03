const {By,Key,Builder, until, WebDriver} = require("selenium-webdriver");
require("chromedriver");

async function test(){
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();
    
    // Step 1 -To fetch our server from the browser with our code.
    await driver.get("https://c5g8-esc.onrender.com");
        
    await driver.manage().setTimeouts({ implicit: 10000 });
    console.info(await driver.manage().getTimeouts());
    await driver.sleep(5000);

    let LoginButton = driver.findElement(By.name("button_login"));
    console.log("Found Log In button");

    // click on log in button
    await LoginButton.click();
    console.log("Clicked on Log In button");
    await driver.sleep(2000);
    // wait for login page and
    
    // enter details of an already registered user
    await driver.findElement(By.name("loginUsernameInput")).sendKeys("testuser123");
    await driver.findElement(By.name("loginPasswordInput")).sendKeys("testpw123");
    await driver.sleep(2000);
    await driver.findElement(By.name("showPassword")).click();
    await driver.sleep(2000);
    await driver.findElement(By.name("loginSubmitButton")).click();

    await driver.wait(until.elementIsVisible(await driver.findElement(By.name("namePlaceholder"))), 5000);
    console.log("user has logged in successfully")
    await driver.sleep(5000);

    // logout
    await driver.findElement(By.name("LogoutButton")).click();
    console.log("user has logged out successfully")
    await driver.sleep(5000);
    await driver.close();
    
     //It is always a safe practice to quit the browser after execution
     await driver.quit();

}

test();
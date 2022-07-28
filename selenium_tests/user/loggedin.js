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

    // click on login button
    await driver.findElement(By.name("LogInButton")).click();

    // wait for login page and
    try{
        await driver.wait(until.elementIsVisible(await driver.findElement(By.name("registrationErrorMsg"), )));
        // enter details of an already registered user
        await driver.findElement(By.name("loginUsernameInput")).sendKeys("testuser123");
        await driver.findElement(By.name("loginInput")).sendKeys("testpw123");
        await driver.findElement(By.name("loginSubmitButton")).click();

        try {
            await driver.wait(until.elementIsVisible(await driver.findElement(By.name("ProfileButton"))), 10000);
            console.log("user has logged in successfully")
        }

        catch {
            console.log("user did not log in as NavBar did not change rendering")
        }
    }
    catch(error) {
        console.log("login page not loading");
    }
    
    await sleep(5000);
    await driver.close();
    
     //It is always a safe practice to quit the browser after execution
     await driver.quit();

}

test();
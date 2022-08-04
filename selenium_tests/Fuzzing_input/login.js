const {By,Key,Builder, until} = require("selenium-webdriver");
require("chromedriver");

// characters = abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_{}[];:`~

// generate inputs with fuzzed data using appropriate inputs

const length = Math.floor(Math.random() * 100)

function alphanumericFuzz(){
    var alphanumericFuzzed = '';
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    var charLength = characters.length;
    for(var i = 0; i < length; i++){
        alphanumericFuzzed += characters.charAt(Math.floor(Math.random()*charLength));
    }
    return alphanumericFuzzed;
}

function textFuzz(){
    var textFuzzed = '';
    var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_{}[];:`~";
    var charLength = characters.length;
    for(var i = 0; i < length; i++){
        textFuzzed += characters.charAt(Math.floor(Math.random()*charLength));
    }
    return textFuzzed;
}


async function loop(driver, loginUsername, loginPassword, submitButton) {
    await loginUsername.click();
    // clear input
    await loginUsername.sendKeys(Key.CONTROL, 'a', Key.DELETE);
    await loginUsername.sendKeys(alphanumericFuzz());

    await loginPassword.click();
    // clear input
    await loginPassword.sendKeys(Key.CONTROL, 'a', Key.DELETE);
    await loginPassword.sendKeys(textFuzz());

    await submitButton.click();
    
    await driver.sleep(1000);
}

async function test() {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("https://c5g8-esc.onrender.com/login");
    await driver.manage().setTimeouts({implicit:10000});

    let loginUsername = await driver.findElement(By.name("loginUsernameInput"));
    let loginPassword = await driver.findElement(By.name("loginPasswordInput"));
    let submitButton = await driver.findElement(By.name("loginSubmitButton"));
    
    console.log("Fuzzing in progress")
    // keep looping until search is valid (which is very unlikely)
    while (true) {
        await loop(driver, loginUsername, loginPassword, submitButton);
        // If search is valid, close test
        if (!loginUsername.isDisplayed) { 
            console.log("Fuzzing ended");
            await driver.close(); }
    }
};

test();
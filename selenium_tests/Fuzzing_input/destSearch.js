const {By,Key,Builder, until} = require("selenium-webdriver");
require("chromedriver");

// characters = abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_{}[];:`~

// generate inputs with fuzzed data using appropriate inputs
function textFuzz(){
    const length = Math.floor(Math.random() * 100)
    var textFuzzed = '';
    var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_{}[];:`~";
    var charLength = characters.length;
    for(var i = 0; i < length; i++){
        textFuzzed += characters.charAt(Math.floor(Math.random()*charLength));
    }
    return textFuzzed;
}


async function loop(destSearch, submitButton) {
    await destSearch.click();
    // clear input
    await destSearch.sendKeys(Key.CONTROL, 'a', Key.DELETE);

    await destSearch.sendKeys(textFuzz());
    await destSearch.sendKeys(Key.ENTER);

    await submitButton.click();
}

async function test() {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("https://c5g8-esc.onrender.com/");
    await driver.manage().setTimeouts({implicit:10000});

    let destSearch = await driver.findElement(By.name("dest_input"));
    let submitButton = await driver.findElement(By.name("dest_search_submit"));
    
    console.log("Fuzzing in progress")
    // keep looping until search is valid (which is very unlikely)
    while (true) {
        await loop(destSearch, submitButton);
        // If search is valid, close test
        if (!destSearch.isDisplayed) {
            console.log("Fuzzing ended");
            await driver.close(); }
    }
    
    
};

test();
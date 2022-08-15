const {By,Key,Builder, until} = require("selenium-webdriver");
require("chromedriver");

// characters = abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_{}[];:`~

// generate inputs with fuzzed data using appropriate inputs
function alphabetFuzz(){
    var length = Math.floor(Math.random() * 3) 
    var alphabetFuzzed = ""
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charLenght = characters.length;
    for(var i = 0; i < length; i++){
        alphabetFuzzed += characters.charAt(Math.floor(Math.random()*charLenght));
    }
    // console.log(alphabetFuzzed);
    return alphabetFuzzed;
}


async function loop(driver, hotelSearch) {
    await hotelSearch.click();
    // clear input
    await hotelSearch.sendKeys(Key.CONTROL, 'a', Key.DELETE);
    await driver.sleep(1000);
    await hotelSearch.sendKeys(alphabetFuzz());
    await driver.sleep(1000);

}

async function test() {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("https://c5g8-esc.onrender.com/");
    await driver.manage().setTimeouts({implicit:10000});
    await driver.sleep(5000);
    let destSearch = await driver.findElement(By.name("dest_input"));

    await destSearch.click();
    await destSearch.sendKeys("Sin", Key.ENTER);
    await driver.findElement(By.name("dest_search_submit")).click();

    await driver.sleep(5000);
    await driver.wait(until.elementIsVisible(await driver.findElement(By.name("button_bookHotel"))));

    let hotelSearch = await driver.findElement(By.name("HotelSearchInput"));
    await driver.sleep(5000);
        
    console.log("Fuzzing in progress")
    // keep looping
    while (true) {
        await loop(driver, hotelSearch);
        // If page changes, close test
        if (!hotelSearch.isDisplayed) {
            console.log("Fuzzing ended");
            await driver.close(); }
    }
    
    
};

test();
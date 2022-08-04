const {By,Key,Builder, until} = require("selenium-webdriver");
require("chromedriver");

function clickableComponents(){

    var components = [
        "salutation", 
        "firstName", 
        "lastName", 
        "email", 
        "number", 
        "message", 
        "cardName", 
        "cardNumber", 
        "expiryMonth", 
        "expiryYear", 
        "CVV", 
        "billingAddress"
        // "button_confirmBooking", 
        // "button_linkToHomePage", 
        // "button_register", 
        // "button_login", 
        // "button_viewBooking"
    ];

    var randComp = components[Math.floor(Math.random() * components.length)];

    return randComp
}

async function test(){

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("https://c5g8-esc.onrender.com/booking");
    await driver.manage().setTimeouts({implicit:10000});
    await driver.sleep(5000);

    for (let i = 0; i < 100; i ++){
        let Clickable = driver.findElement(By.name(clickableComponents()));
        await Clickable.click();
    }

}

test();
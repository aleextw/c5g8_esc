const {By,Key,Builder, until} = require("selenium-webdriver");
require("chromedriver");

// characters = abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_{}[];:`~

// generate inputs with fuzzed data using appropriate inputs

const length = Math.floor(Math.random() * 100);

function textFuzz(){
    var textFuzzed = '';
    var characters = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_{}[];:`~";
    var charLenght = characters.length;
    for(var i = 0; i < length; i++){
        textFuzzed += characters.charAt(Math.floor(Math.random()*charLenght));
    }
    return textFuzzed;
}


function selectFuzz(element){
    // randomising the up or down selection
    random = Math.floor(Math.random()*12)
    for(var i = 0; i < random ; i++){
        if (random%2==0) {
            element.sendKeys(Key.ARROW_DOWN)
        } else {element.sendKeys(Key.ARROW_UP)}
    }
}


async function loop(driver, salutation, firstName, lastName, email, number, message ,cardName, cardNumber, expiryMonth, expiryYear, CVV, billingAddress, submitButton) {
    
    await salutation.click();
    selectFuzz(salutation);
    await salutation.sendKeys(Key.ENTER);

    await firstName.click();
    await firstName.sendKeys(Key.CONTROL, 'a', Key.DELETE);
    await firstName.sendKeys(textFuzz());
    
    await lastName.click();
    await lastName.sendKeys(Key.CONTROL, 'a', Key.DELETE);
    await lastName.sendKeys(textFuzz());
    
    await email.click();
    await email.sendKeys(Key.CONTROL, 'a', Key.DELETE);
    await email.sendKeys(textFuzz());
    
    await number.click();
    await number.sendKeys(Key.CONTROL, 'a', Key.DELETE);
    await number.sendKeys(textFuzz());
    
    await message.click();
    await message.sendKeys(Key.CONTROL, 'a', Key.DELETE);
    await message.sendKeys(textFuzz());
    
    await cardName.click();
    await cardName.sendKeys(Key.CONTROL, 'a', Key.DELETE);
    await cardName.sendKeys(textFuzz());
    
    await cardNumber.click();
    await cardNumber.sendKeys(Key.CONTROL, 'a', Key.DELETE);
    await cardNumber.sendKeys(textFuzz());

    await expiryMonth.click();
    selectFuzz(expiryMonth);
    await expiryMonth.sendKeys(Key.ENTER);

    await expiryYear.click();
    selectFuzz(expiryYear);
    await expiryYear.sendKeys(Key.ENTER);
    await CVV.sendKeys(textFuzz());
    
    await billingAddress.click();
    await billingAddress.sendKeys(Key.CONTROL, 'a', Key.DELETE);
    await billingAddress.sendKeys(textFuzz());

    await submitButton.click();

    await driver.sleep(3000);

    // If search is valid, close test
    if (!firstName.isDisplayed) { 
        console.log("Fuzzing ended");
        await driver.close(); }

}

async function test() {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("https://c5g8-esc.onrender.com");
    await driver.manage().setTimeouts({implicit:10000});
    await driver.sleep(5000);

    // load search input bar then continue
    let inputBar = driver.findElement(By.name("dest_input"));
    await inputBar.click();
    await inputBar.clear();
    await sleep(3000);

    // Step 2 - enter destination input
    await inputBar.sendKeys("sing");
    let autocomplete = driver.findElement(By.name("dest_suggestions"));
    await driver.wait(until.elementIsVisible(autocomplete), 5000);
    // choose destination
    await driver.findElement(By.name("dest_input")).sendKeys(Key.ENTER);
    // submit
    console.log(
        `Search entered successfully for ${await inputBar.getAttribute(
        "value"
        )} in DestinationSearch for HBS`
    );
    await driver.findElement(By.name("dest_search_submit")).click();
    
    await driver.manage().setTimeouts({ implicit: 5000 });
    console.info(await driver.manage().getTimeouts());
    // load HotelCards then continue
    await driver.sleep(until.elementIsVisible(By.name("button_bookHotel")));
    await driver.sleep(5000);
    // Step 3- choose Hotel
    await driver.findElement(By.name("button_bookHotel")).click();
    console.log(
        `Hotel chosen successfully in HotelSearchResults for HBS`
    );
    await driver.sleep(until.elementIsVisible(By.name("RoomCard")));
    await driver.sleep(3000);
    console.log("Scroll to rooms");
    await driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(By.name("RoomCard")));

    await driver.sleep(5000);

    // Step 4 - choose room
    await driver.findElement(By.name("button_bookRoom")).click();
    console.log(
        `Room chosen successfully in ViewHotelDetails for HBS`
    );
    
    await sleep(5000);

    // Step 5 - full in details
    let salutation = await driver.findElement(By.name("salutation"));
    let firstName = await driver.findElement(By.name("firstName"));
    let lastName = await driver.findElement(By.name("lastName"));
    let email = await driver.findElement(By.name("email"));
    let number = await driver.findElement(By.name("number"));
    let message = await driver.findElement(By.name("message"));
    let cardName = await driver.findElement(By.name("cardName"));
    let cardNumber = await driver.findElement(By.name("cardNumber"));
    let expiryMonth = await driver.findElement(By.name("expiryMonth"));
    let expiryYear = await driver.findElement(By.name("expiryYear"));
    let CVV = await driver.findElement(By.name("CVV"));
    let billingAddress = await driver.findElement(By.name("billingAddress"));

    let submitButton = await driver.findElement(By.name("button_confirmBooking"));
    
    await driver.sleep(3000)

    // keep looping until booking is valid (which is very unlikely)
    
    console.log("Fuzzing in progress")
    while (true) {
        await driver.sleep(until.elementIsVisible(firstName));
        await loop(driver, salutation ,firstName, lastName, email, number, message ,cardName, cardNumber, expiryMonth, expiryYear, CVV, billingAddress, submitButton);
        
    }
};

test();
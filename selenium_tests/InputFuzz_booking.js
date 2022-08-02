const {By,Key,Builder, until} = require("selenium-webdriver");
require("chromedriver");

// characters = abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_{}[];:`~

// generate inputs with fuzzed data using appropriate inputs

const length = Math.floor(Math.random() * 100)

function alphabetFuzz(){
    var alphabetFuzzed = '';
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charLenght = characters.length;
    for(var i = 0; i < length; i++){
        alphabetFuzzed += characters.charAt(Math.floor(Math.random()*charLenght));
    }
    return alphabetFuzzed;
}

function numberFuzz(){
    var numberFuzzed = '';
    var characters = "1234567890";
    var charLenght = characters.length;
    for(var i = 0; i < length; i++){
        numberFuzzed += characters.charAt(Math.floor(Math.random()*charLenght));
    }
    return numberFuzzed;
}

function emailFuzz(){
    var emailFuzzed = '';
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charLenght = characters.length;
    for(var i = 0; i < length; i++){
        emailFuzzed += characters.charAt(Math.floor(Math.random()*charLenght));
    }

    var emails = ["@gmail.com", "@outlook.com"]
    var randEmail = emails[Math.floor(Math.random() * emails.length)]

    emailFuzzed += randEmail;

    return emailFuzzed;
}

function nameFuzz(){
    var nameFuzzed = '';
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charLenght = characters.length;
    for(var i = 0; i < length; i++){
        nameFuzzed += characters.charAt(Math.floor(Math.random()*charLenght));
    }
    nameFuzzed = nameFuzzed + " " + nameFuzzed
    return nameFuzzed;
}

function textFuzz(){
    var textFuzzed = '';
    var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_{}[];:`~";
    var charLenght = characters.length;
    for(var i = 0; i < length; i++){
        textFuzzed += characters.charAt(Math.floor(Math.random()*charLenght));
    }
    return textFuzzed;
}


async function test(){

    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("https://localhost:3000/booking");
    await driver.manage().setTimeouts({implicit:10000});

    let firstName = driver.findElement(By.name("firstName"));
    await firstName.click();
    await firstName.clear();
    await SelectInput(3000);
    await firstName.sendKeys(alphabetFuzz);

    let lastName = driver.findElement(By.name("lastName"));
    await lastName.click();
    await lastName.clear();
    await SelectInput(3000);
    await lastName.sendKeys(alphabetFuzz);

    let email = driver.findElement(By.name("email"));
    await email.click();
    await email.clear();
    await SelectInput(3000);
    await email.sendKeys(emailFuzz);

    let number = driver.findElement(By.name("number"));
    await number.click();
    await number.clear();
    await SelectInput(3000);
    await number.sendKeys(numberFuzz);
    
    let message = driver.findElement(By.name("message"));
    await message.click();
    await message.clear();
    await SelectInput(3000);
    await message.sendKeys(alphabetFuzz);

    let cardName = driver.findElement(By.name("cardName"));
    await cardName.click();
    await cardName.clear();
    await SelectInput(3000);
    await cardName.sendKeys(nameFuzz);

    let cardNumber = driver.findElement(By.name("cardNumber"));
    await cardNumber.click();
    await cardNumber.clear();
    await SelectInput(3000);
    await cardNumber.sendKeys(numberFuzz);

    let CVV = driver.findElement(By.name("CVV"));
    await CVV.click();
    await CVV.clear();
    await SelectInput(3000);
    await CVV.sendKeys(numberFuzz);

    let billingAddress = driver.findElement(By.name("billingAddress"));
    await billingAddress.click();
    await billingAddress.clear();
    await SelectInput(3000);
    await billingAddress.sendKeys(textFuzz);

    await driver.fineElement(By.name("button_confirmBooking")).click();
    await driver.sleep(3000)
}

async function loopTesting() {
    for(let i = 0; i < 100; i++){
        await test();
    }
    await driver.close();

    await driver.quit();
};

loopTesting();
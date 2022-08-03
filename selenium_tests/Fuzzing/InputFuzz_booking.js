const {By,Key,Builder, until} = require("selenium-webdriver");
require("chromedriver");

// characters = abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_{}[];:`~

// generate inputs with fuzzed data using appropriate inputs

const length = Math.floor(Math.random() * 100);

function alphabetFuzz(){
    var alphabetFuzzed = ""
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charLenght = characters.length;
    for(var i = 0; i < length; i++){
        alphabetFuzzed += characters.charAt(Math.floor(Math.random()*charLenght));
    }
    console.log(alphabetFuzzed);
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

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("https://c5g8-esc.onrender.com/booking");
    await driver.manage().setTimeouts({implicit:10000});

    await driver.findElement(By.name("firstName")).sendKeys(alphabetFuzz());
    await driver.findElement(By.name("lastName")).sendKeys(alphabetFuzz());
    await driver.findElement(By.name("email")).sendKeys(emailFuzz());
    await driver.findElement(By.name("number")).sendKeys(numberFuzz());
    await driver.findElement(By.name("message")).sendKeys(textFuzz());
    await driver.findElement(By.name("cardName")).sendKeys(nameFuzz());
    await driver.findElement(By.name("cardNumber")).sendKeys(numberFuzz());
    await driver.findElement(By.name("expiryMonth")).click();
    await driver.findElement(By.name("expiryMonth")).sendKeys(Key.ARROW_DOWN,Key.ARROW_DOWN,Key.ARROW_DOWN,Key.ENTER);
    await driver.findElement(By.name("expiryYear")).click();
    await driver.findElement(By.name("expiryYear")).sendKeys(Key.ARROW_DOWN,Key.ARROW_DOWN,Key.ARROW_DOWN,Key.ENTER);
    await driver.findElement(By.name("CVV")).sendKeys(numberFuzz());
    await driver.findElement(By.name("billingAddress")).sendKeys(textFuzz());

    await driver.findElement(By.name("button_confirmBooking")).click();

    
    await driver.sleep(3000)

}

async function loopTesting() {
    for(let i = 0; i < 100; i++){
        await test();
    }
};

loopTesting();
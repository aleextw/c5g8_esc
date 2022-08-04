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

function textFuzz(){
    var textFuzzed = '';
    var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_{}[];:`~";
    var charLenght = characters.length;
    for(var i = 0; i < length; i++){
        textFuzzed += characters.charAt(Math.floor(Math.random()*charLenght));
    }
    return textFuzzed;
}


async function test() {

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("https://c5g8-esc.onrender.com/register");
    await driver.manage().setTimeouts({implicit:10000});

    
    await driver.findElement(By.name("firstNameInput")).sendKeys(alphabetFuzz());
    await driver.findElement(By.name("lastNameInput")).sendKeys(alphabetFuzz());
    await driver.findElement(By.name("emailInput")).sendKeys(emailFuzz());
    await driver.findElement(By.name("numberInput")).sendKeys(numberFuzz());
    await driver.findElement(By.name("usernameInput")).sendKeys(textFuzz());
    await driver.findElement(By.name("passwordInput")).sendKeys(textFuzz());


    let submitButton = driver.findElement(By.name("registerUser"));
    await submitButton.click();
}

async function loopTesting() {
    for(let i = 0; i < 100; i++){
        await test();
    }
};

loopTesting();
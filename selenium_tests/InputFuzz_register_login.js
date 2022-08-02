const { default: SelectInput } = require("@mui/material/Select/SelectInput");
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


async function test() {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("https://localhost:3000");
    await driver.manage().setTimeouts({implicit:10000});

    let registerButton = driver.findElement(By.name("registerUser"));
    await registerButton.click();
    

    let firstName = driver.findElement(By.name("firstNameInput"));
    await firstName.click();
    await firstName.clear();
    await SelectInput(3000);
    await firstName.sendKeys(alphabetFuzz);

    let lastName = driver.findElement(By.name("lastNameInput"));
    await lastName.click();
    await lastName.clear();
    await SelectInput(3000);
    await lastName.sendKeys(alphabetFuzz);

    let email = driver.findElement(By.name("emailInput"));
    await email.click();
    await email.clear();
    await SelectInput(3000);
    await email.sendKeys(emailFuzz);

    let number = driver.findElement(By.name("numberInput"));
    await number.click();
    await number.clear();
    await SelectInput(3000);
    await number.sendKeys(numberFuzz);

    let username = driver.findElement(By.name("usernameInput"));
    await username.click();
    await username.clear();
    await SelectInput(3000);
    await username.sendKeys(textFuzz);

    let password = driver.findElement(By.name("passwordInput"));
    await password.click();
    await password.clear();
    await SelectInput(3000);
    await password.sendKeys(textFuzz);

    let submitButton = driver.findElement(By.name("registerUser"));
    await submitButton.click();
}

async function loopTesting() {
    for(let i = 0; i < 100; i++){
        await test();
    }
    await driver.close();

    await driver.quit();
};

loopTesting();
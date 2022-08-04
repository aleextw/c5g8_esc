const {By,Key,Builder, until} = require("selenium-webdriver");
require("chromedriver");

// characters = abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_{}[];:`~

// generate inputs with fuzzed data using appropriate inputs

const length = Math.floor(Math.random() * 100)

function alphanumericAndSpaceFuzz(){
    var alphanumericFuzzed = '';
    var characters = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    var charLength = characters.length;
    for(var i = 0; i < length; i++){
        alphanumericFuzzed += characters.charAt(Math.floor(Math.random()*charLength));
    }
    return alphanumericFuzzed;
}

function alphanumericFuzz(){
    var alphanumericFuzzed = '';
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    var charLength = characters.length;
    for(var i = 0; i < length; i++){
        alphanumericFuzzed += characters.charAt(Math.floor(Math.random()*charLength));
    }
    return alphanumericFuzzed;
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


async function loop(driver, firstName, lastName, email, number, username,password, submitButton) {
    await firstName.click();
    // clear input
    await firstName.sendKeys(Key.CONTROL, 'a', Key.DELETE);
    await firstName.sendKeys(alphanumericAndSpaceFuzz());

    await lastName.click();
    // clear input
    await lastName.sendKeys(Key.CONTROL, 'a', Key.DELETE);
    await lastName.sendKeys(alphanumericAndSpaceFuzz());

    await email.click();
    // clear input
    await email.sendKeys(Key.CONTROL, 'a', Key.DELETE);
    await email.sendKeys(emailFuzz());

    await number.click();
    // clear input
    await number.sendKeys(Key.CONTROL, 'a', Key.DELETE);
    await number.sendKeys(numberFuzz());

    await username.click();
    // clear input
    await username.sendKeys(Key.CONTROL, 'a', Key.DELETE);
    await username.sendKeys(alphanumericFuzz());

    await password.click();
    // clear input
    await password.sendKeys(Key.CONTROL, 'a', Key.DELETE);
    await password.sendKeys(textFuzz());

    await submitButton.click();
    
    await driver.sleep(1000);

}

async function test() {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("https://c5g8-esc.onrender.com");
    await driver.manage().setTimeouts({implicit:10000});
    await driver.sleep(5000);

    console.log("Fuzzing in progress")
    // keep looping until search is valid (which is very unlikely)
    while (true) {
        let register = await driver.findElement(By.name("button_register"));
        await driver.sleep(until.elementIsVisible(register));
        console.log("Wait to click Register button");
        await driver.sleep(1000);
        await register.click();

        let firstName =  await driver.findElement(By.name("firstNameInput"));
        let lastName = await driver.findElement(By.name("lastNameInput"))
        let email = await driver.findElement(By.name("emailInput"));
        let number = await driver.findElement(By.name("numberInput"));
        let username = await driver.findElement(By.name("usernameInput"));
        let password = await driver.findElement(By.name("passwordInput"));
        let submitButton = await driver.findElement(By.name("registerUser"));
    
        await driver.sleep(until.elementIsVisible(firstName));
        
        await loop(driver, firstName, lastName, email, number, username,password, submitButton);
        await driver.sleep(until.elementIsVisible(driver.findElement(By.name("dest_input"))));
        console.log("Click logout button");
        await driver.findElement(By.name("LogoutButton")).click();
        // If register is valid, close test
        if (firstName.isDisplayed) { 
            console.log("Fuzzing ended");
            await driver.close(); }
    }
};

test();
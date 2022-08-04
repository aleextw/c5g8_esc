const {By,Key,Builder, until} = require("selenium-webdriver");
require("chromedriver");

async function test(){
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser("chrome").build();
    
    // To fetch our server from the browser with our code.
    await driver.get("https://c5g8-esc.onrender.com");
    await driver.manage().setTimeouts({ implicit: 10000 });
    console.info(await driver.manage().getTimeouts());await driver.sleep(10000);

    // Step 1 - register user
    let RegisterButton = driver.findElement(By.name("button_register"));
    console.log("Found register button");

    // click on Register button
    await RegisterButton.click();
    console.log("Clicked on register button");
    await driver.sleep(5000);

    // fill out details on Register page
    await driver.findElement(By.name("firstNameInput")).sendKeys("testFirstName");
    await driver.findElement(By.name("lastNameInput")).sendKeys("testLastName");
    await driver.findElement(By.name("emailInput")).sendKeys("testemail@123.com");
    await driver.findElement(By.name("numberInput")).sendKeys("94345678");
    await driver.findElement(By.name("usernameInput")).sendKeys("testuser123");
    await driver.findElement(By.name("passwordInput")).sendKeys("testpw123");
    await sleep(3000);
    console.log("Filled out valid details");

    // click on register button
    await driver.findElement(By.name("registerUser")).click();

    // explicitly wait until registration is complete and user is routed back to homepage
    await driver.wait(until.elementIsVisible(await driver.findElement(By.name("dest_search_submit"))), 10000);
    console.log("User has successfully registered!");

    await driver.sleep(5000);


    // // // Step 2 - Log in
    // let LoginButton = driver.findElement(By.name("button_login"));
    // console.log("Found Log In button");
    // await LoginButton.click();
    // console.log("Clicked on Log In button");
    // await driver.sleep(2000);
    // // wait for login page and
    // // enter details of an already registered user
    // await driver.findElement(By.name("loginUsernameInput")).sendKeys("testuser123");
    // await driver.findElement(By.name("loginPasswordInput")).sendKeys("testpw123");
    // await driver.sleep(2000);
    // await driver.findElement(By.name("showPassword")).click();
    // await driver.sleep(2000);
    // await driver.findElement(By.name("loginSubmitButton")).click();

    // await driver.wait(until.elementIsVisible(await driver.findElement(By.name("namePlaceholder"))), 5000);
    // console.log("User has logged in successfully")
    
    // await sleep(3000);
    
    // load search input bar then continue
    let inputBar = await driver.findElement(By.name("dest_input"));
    await inputBar.click();
    await inputBar.clear();
    await sleep(2000);

    // Step 2 - enter destination input
    await inputBar.sendKeys("s","i","n");
    await sleep(2000);
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
    
    await driver.manage().setTimeouts({ implicit: 10000 });
    console.info(await driver.manage().getTimeouts());
    // load HotelCards then continue
    await driver.sleep(5000);
    // Step 3 - choose Hotel
    await driver.findElement(By.name("button_bookHotel")).click();
    console.log(
        `Hotel chosen successfully in HotelSearchResults for HBS`
    );
    await driver.sleep(5000);
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
    await salutation.click();
    await salutation.sendKeys(Key.ARROW_DOWN);
    await salutation.sendKeys(Key.ENTER);

    // some details already autofilled
    await driver.findElement(By.name("message")).sendKeys("Anniversary Celebration, please prepare a cake!");

    await driver.findElement(By.name("cardName")).sendKeys("Selena Test");
    await driver.findElement(By.name("cardNumber")).sendKeys("1234567812345678");
    await driver.findElement(By.name("expiryMonth")).click();
    await driver.findElement(By.name("expiryMonth")).sendKeys(Key.ARROW_DOWN,Key.ARROW_DOWN,Key.ARROW_DOWN,Key.ENTER);
    await driver.findElement(By.name("expiryYear")).click();
    await driver.findElement(By.name("expiryYear")).sendKeys(Key.ARROW_DOWN,Key.ARROW_DOWN,Key.ARROW_DOWN,Key.ENTER);
    await driver.findElement(By.name("CVV")).sendKeys("123");
    await driver.findElement(By.name("billingAddress")).sendKeys("134578")
    await driver.findElement(By.name("button_confirmBooking")).click();
    console.log(
        `Details filled in successfully in BookingDetails for HBS`
    );
    await sleep(5000);

    await driver.findElement(By.name("copyBookingRef")).click();
    await sleep(2000);
    await driver.findElement(By.name("button_viewBooking")).click();
    await sleep(2000);
    await driver.findElement(By.name("input_booking_uid")).click();
    await driver.findElement(By.name("input_booking_uid")).sendKeys(Key.CONTROL,'v');
    await driver.sleep(2000);
    await driver.findElement(By.name("button_findBooking")).click();
    console.log(
        `Booking UID/ref retrieved for HBS`
    );
    
    await driver.sleep(5000);

    await driver.close();
    
     //It is always a safe practice to quit the browser after execution
     await driver.quit();

}

test();
// run w ` node a_example.js `
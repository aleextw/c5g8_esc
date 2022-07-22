const {By,Key,Builder, until} = require("selenium-webdriver");
require("chromedriver");

async function test1(){
 
   //To wait for browser to build and launch properly
   let driver = await new Builder().forBrowser("chrome").build();

   // Step 1 -To fetch our server from the browser with our code.
   await driver.get("http://localhost:3000");
   await driver.manage().setTimeouts({implicit: 10000});
   console.info( await driver.manage().getTimeouts() );
   // load search input bar then continue
   let inputBar = driver.findElement(By.name("dest_input"));
   await driver.wait(until.elementIsVisible(inputBar), 5000);
   await inputBar.clear();

   // Step 2 - enter destination input
   await inputBar.sendKeys("b");
   await inputBar.sendKeys("e");
   let autocomplete = driver.findElement(By.name("dest_suggestions"));
   await driver.wait(until.elementIsVisible(autocomplete), 5000);
   // // Step 3 - scroll down to input
   // await inputBar.sendKeys(Key.ARROW_DOWN);
   // await inputBar.sendKeys(Key.ARROW_DOWN);
   // await inputBar.sendKeys(swd.Key.RETURN);
   // await console.log(await inputBar.getText());

   // Step 4 - submit
   // await driver.findElement(By.name("dest_search_submit")).click();
   // console.log(
   //    "Search entered successfully in " +
   //    "DestinationSearch for HBS"
   // );
   await driver.close()
};

// passed
test1();
// run w ` node ____.js `
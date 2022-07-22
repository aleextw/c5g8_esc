const {By,Key,Builder, } = require("selenium-webdriver");
require("chromedriver");

async function test1(){
   // TODO: not working yet, figure out wait
   var searchString = "Singapore, Singapore";

   //To wait for browser to build and launch properly
   let driver = await new Builder().forBrowser("chrome").build();

   //To fetch our server from the browser with our code.
   await driver.get("http://localhost:3000");

   //To send a search query by passing the value in searchString.
   await driver.findElement(By.name("dest_input")).sendKeys(searchString);

   // submit
   await driver.findElement(By.name("dest_search_submit")).click();

   //Verify the page title and print it
   var title = await driver.getTitle();
   console.log('Title is:',title);
   // goes to next page
   // let el = await driver.findElement(By.name("HotelCard"));
   // await driver.wait(until.elementIsVisible(el),10000);

   console.log("Success")
   //It is always a safe practice to quit the browser after execution
   await driver.quit();

}

test1();
// run w ` node a_example.js `
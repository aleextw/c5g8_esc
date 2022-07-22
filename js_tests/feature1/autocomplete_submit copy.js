// let swd = require("selenium-webdriver");
// require("chromedriver");

// async function test1(){
 
//    var searchString = "Si";

//    //To wait for browser to build and launch properly
//    let tab = await new swd.Builder().forBrowser("chrome").build();

//    // Step 1 -To fetch our server from the browser with our code.
//    let tabToOpen = tab.get("http://localhost:3000");
//    tabToOpen
//    .then(function () {
//       // Timeout to wait if connection is slow
//       let findTimeOutP =
//          tab.manage().setTimeouts({
//                implicit: 10000, // 10 seconds
//          });
//       console.info;
//       return findTimeOutP;
//    })
//    .then(function () {
//       // wait for input bar to appear
//       let load = tab.wait(swd.until.elementIsVisible(swd.By.name("dest_input")),5000);
//       return load;
//    });
//    .then(function () {
//       // Step 2 - enter destination input
//       //To send a search query by passing the value in searchString.

//       let promiseFillDestSearch = tab.findElement(swd.By.name("dest_input")).sendKeys(searchString);
//       return promiseFillDestSearch;
//    })
//    .then(function () {
//       console.log(
//          "Search entered successfully in " +
//          "DestinationSearch for HBS"
//       );
//       // let searchBar_inp = tab.findElement(swd.By.name("dest_input"));
//       // tab.wait(swd.until.elementLocated(swd.By.className('dest__suggestions')), 10000)
//       //    .then(searchBar_inp => { searchBar_inp.sendKeys(swd.Key.ARROW_DOWN); });
//       //    console.log(
//       //       "Destination chosen successfully in " +
//       //       "DestinationSearch for HBS"
//       //    );
//       // return searchBar_inp.sendKeys(swd.Key.ENTER);
//       // await tab.wait(swd.until.elementIsVisible(el), 5000);
//       // Step 3 - scroll down to input
//       let promiseArrowDown = tab.findElement(swd.By.name("dest_input")).sendKeys(swd.Key.ARROW_DOWN,swd.Key.ENTER);
//       return promiseArrowDown;
//    })
//    .then(function () {
//    })
   
//    // .catch(function (err) {
//    //    console.log("Error ", err, " occurred!");
//    // });
//    // arrow down 
//    // await tab.findElement(swd.By.name("dest_search_submit")).click();
   
   
// }
// // passed
// test1();
// // run w ` node ____.js `
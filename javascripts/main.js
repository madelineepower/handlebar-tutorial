"use strict";
console.log("hello Cupcakes are great");

let HandleBars = require('hbsfy/runtime'),
  cakeInventory = require('./bakery.js'),
  cakeTemplate = require('../templates/cake-grid.hbs'),
  eventStuff = require("./events.js"),
  welcomeTemplate = require("../templates/welcome.hbs"),
  welcomeData = require("../templates/welcome-data.js");

HandleBars.registerHelper("increment", (value) => parseInt(value) + 1);

$("#welcome").append(welcomeTemplate(welcomeData));

function populatePage(stuff){
  let newDiv = document.createElement("div");
  newDiv.innerHTML = cakeTemplate(stuff);
  $("#cake-cards").append(newDiv);
}


cakeInventory.loadInventory()
.then(
  (inventoryFromLoadInventoryResolve) => {
    console.log("cake promise", inventoryFromLoadInventoryResolve);
    populatePage(inventoryFromLoadInventoryResolve);
    eventStuff();
  },
  (reason) => {
    console.log("something went really wrong, sorry to break your heart.");
  });

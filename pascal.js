"use strict";

const log = console.log;

log("Hello from log!");

// Arrays (Lists)

// index as key
// ordered

// Objects (Dictionaries)

// key is named
// unordered

let array1 = ["Virgil", "Catullus", "Mouse"];
array1[0]

let obj1 = {name: "Pascal", age: 36, location: "Texas"
}

obj1.name // "pascal"
obj1["name"] // "pascal"

obj1[userInput] === userInput2
// let user define prop and compare to user-defined value

// variable to capture results
// array to be accessed
// use HOAM (filter, map, reduce)
    // cb

let result = array1.filter(
    // declare the item name in param (el or cat)
    // check if item matches condition
        // if true, return true
    // function (catString){
    //     if (catString === "Virgil"){
    //         return true;
    //     }
    // }
    function(catString){
        if(catString === "Virgil") return true;
    }
);

// Easier filter cb
let arrowResult = array1.filter(
    // (params)  =>  condition
    (catString) => catString === "Virgil"
)



log(arrowResult)

// SBTs
// Function that takes in people (array)
//      asks user for property
//      asks user for value
        // filter array based on both user inputs
        // if length of results is 1, return results
        // if length of results is 0, run function again with people
        // length of results >1, keep running function with results
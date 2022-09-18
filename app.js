/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
  // promptFor() is a custom function defined below that helps us prompt and validate input more easily
  // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  // Routes our application based on the user's input
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
      //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
      //   searchResults = searchByTraits(people);
      //   displayPeople(searchResults);
      break;
    default:
      // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
      app(people);
      break;
  }
  // Calls the mainMenu() only AFTER we find the SINGLE PERSON
  mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
  // A check to verify a person was found via searchByName() or searchByTrait()
  if (!person[0]) {
    alert("Could not find that individual.");
    // Restarts app() from the very beginning
    return app(people);
  }
  let displayOption = prompt(
    `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
  );
  // Routes our application based on the user's input
  switch (displayOption) {
    case "info":
      // DONE!! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
      // HINT: Look for a person-object stringifier utility function to help
      let personInfo = displayPerson(person[0]);
      alert(personInfo);
      break;
    case "family":
      //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
      // HINT: Look for a people-collection stringifier utility function to help
      //   let personFamily = findPersonFamily(person[0], people);
      //   alert(personFamily);
      // let results = findPersonFamily(person[0], people)
      // displayPeople(results);
      let results = findSpouse(person[0], people);
      displayPeople(results);
      results = findParents(person[0], people);
      displayPeople(results);
      results = findSiblings(person[0], people);
      displayPeople(results);
      break;
    case "descendants":
      //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
      // HINT: Review recursion lecture + demo for bonus user story
      // let personDescendants = findPersonDescendants(person[0], people);
      // alert(personDescendants);
      break;
    case "restart":
      // Restart app() from the very beginning
      app(people);
      break;
    case "quit":
      // Stop application execution
      return;
    case "test":
      // let results = findPersonFamily(person[0], people)
      // displayPeople(results);
      // let results = findSpouse(person[0], people)
      // displayPeople(results);
      // results = findParents(person[0], people)
      // displayPeople(results);
      // results = findSiblings(person[0], people)
      // displayPeople(results);
      let personDescendants = findPersonDescendants(person[0], people);
      alert(personDescendants);

      // let searchResults = searchBySingle(people);
      // console.log(searchResults);
    // displayPeople(searchResults);
    default:
      // Prompt user again. Another instance of recursion
      return mainMenu(person, people);
  }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
  let foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    }
  });
  return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return `${person.firstName} ${person.lastName}`;
      })
      .join("\n")
  );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
  let personInfo = `First Name: ${person.firstName}\n`;
  personInfo += `Last Name: ${person.lastName}\n`;
  //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
  personInfo += `Gender: ${person.gender}\n`;
  personInfo += `Birthdate: ${person.dob}\n`;
  personInfo += `Height: ${person.height}\n`;
  personInfo += `Weight: ${person.weight}\n`;
  personInfo += `Eye Color: ${person.eyeColor}\n`;
  personInfo += `Occupation: ${person.occupation}\n`;
  alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
  return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
  return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁


function findPersonFamily(person, people) {
  // list = spouse, parent(s), sibling(s)
  // MAKE USE OF 'INCLUDES'
  // find spouse from info. return first & last name with 'spouse'
  //      if spouse id === person id, add person name to 'list'
  // find parents from id's in info. return first & last name with 'parent'
  //      if parent id [0 & 1] === person id, add person name to 'list'
  // find other people with parent id's return names w/ 'sibling'
  //      if parent id [0 & 1] === parent id, add person name to 'list'
  // alert 'list' with labels
  //     let foundFamily = people.map(function(people){
  //         if (person.spouse )
  //     })
  //     return foundFamily;

  let foundSpouse = findSpouse(person, people);
  let foundParents = findParents(person, people);
  let foundSiblings = findSiblings(person, people);
  let foundFamily = foundSpouse.concat(foundParents, foundSiblings);

  return foundFamily;
}

function findSpouse(person, people) {
  return people.filter(function (el) {
    return person.currentSpouse === el.id;
  });
}

function findParents(person, people) {
  return people.filter(function (el) {
    return person.parents.includes(el.id);
  });
}

function findSiblings(person, people) {
  return people.filter(function (el) {
    return (
      // person.id !== person.id &&
      person.parents.includes(el.parents[0]) ||
      person.parents.includes(el.parents[1]) 
    );
  });
}

function findPersonDescendants(person, people=[]) {
  let decendents = people.filter(function(el){

    if (person.id === el.parents[0] || person.id === el.parents[1]){
      return;
    }

    if (decendents.length === 0) {
      return;
    }

    for (let i=0; i<decendents.length; i++){
      decendents = decendents.concat(findPersonDescendants(decendents[i]));
    }

      return decendents
  })

    //if there are no decendents return person inside array (terminating condition)
    //else for every decendent in the collection concatonate decendents with whatever comes back from recursion
  return decendents
}

// Search by Traits
//! TODO #4: Declare a searchByTraits (multiple traits) function ////
//! TODO #4a: Provide option to search for single or multiple ///////
function searchByTraits(people) {
  let singleMultiple = promptFor(
    `Would you like to use a single trait or multiple traits to search?\nType 'single' or 'multiple'.`, chars
  ).toLowerCase();
  let traitChoice;
  switch (singleMultiple) {
    case "single":
      traitChoice = searchBySingle(people);
      break;
    case "multiple":
      traitChoice = searchByMultiple(people);
      break;
  }
  return traitChoice;
}

function searchBySingle(people=[]) {
  let searchTrait = promptFor(`Enter trait you'd like to search by.`, chars);
  let traitValue = promptFor(`Enter the value of that trait.`, chars);
  let foundItems = people.filter(function (el) {
    try {
      if (el[searchTrait] === traitValue) {
        //for strings
        return true;
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (el[searchTrait] === parseInt(traitValue)) {
        //for integers
        return true;
      }
    }
  });
  // if length of found items = 1 return found items
  if (foundItems.length === 1) return foundItems;
  // elif length of found items = 0 (not enough items in box) return searchBySingle(last round of people)
  else if (foundItems.length === 0) {
    alert = `No people found with ${searchTrait} of ${traitValue}.`;
    return searchBySingle(people);
  }
  alert(`We've found some people so far.`)
  displayPeople(people);
  return searchBySingle(foundItems);
}

function searchByMultiple(people) {}

// /////////////////////
function searchByUserDefinedProp(array) {
  let userInputProp = prompt(`Enter property: `);
  let userInputVal = prompt(`Enter Value: `);
  let foundItems = array.filter(function (el) {
    try {
      if (el[userInputProp].includes(userInputVal)) {
        //for strings
        return true;
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (el[userInputProp] === parseInt(userInputVal)) {
        //for integers
        return true;
      }
    }
  });
  return foundItems;
}

function seeAbove() {
  let itemPrinter = searchByUserDefinedProp(array).map(function (el) {
    // .map also means "for each item..."
    return `This sentence can have items represented in it & will apply to each item in the array.`;
  });
}

function recursiveExample(obj, array = []) {
  let subArray = obj.subsidiaries;
  array = [obj];
  if (subArray.length === 0) {
    return array;
  }
  for (let i = 0; i < subArray.length; i++) {
    array = array.concat(recursiveExample(subArray[i]));
  }
  return array;
}

function info() {
  // Gender, Birthdate, Height, Weight, Eye Color, Occupation

  let searchGender = promptFor(`What is the person's gender?`, chars);
  let searchDob = promptFor(
    `What is the person's birthdate? mm/dd/yyyy`,
    chars
  );
  let searchHeight = promptFor(`What is the person's height in inches?`); // integer NOT chars
  let searchWeight = promptFor(`What is the person's weight in pounds?`); // integer NOT chars
  let searchEyeColor = promptFor(`What is the person's eye color?`, chars);
  let searchOccupation = promptFor(`What is the person's occupation?`, chars);
}

// prompt single/multiple traits?
//      (single)
//          ask which trait (by number?)
//          prompt for trait info (run thru chars, promptFor, toLowerCase?)
//              list each trait & info type to expect (int(NOT chars) vs string(chars))
//      (multiple)
//          ask y/n for each trait? then info, then ask if done
//          if not loop (max 5). separate variable for each iteration?
//          filter, return, map?

// ///////////////////////////
function display() {
  let displayOption = prompt(
    `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know..`
  );
}
// /////////////////
// The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
// let foundPerson = people.filter(function (person) {
//     if (person.firstName === firstName && person.lastName === lastName) {
//         return true;
//     }
// });
// return foundPerson;

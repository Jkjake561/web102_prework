/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// Grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// Create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // Loop over each item in the games array
    for (let game of games) {
        // Create a new div element, which will become the game card
        const gameCard = document.createElement("div");

        // Add the class game-card to the div
        gameCard.classList.add("game-card");

        // Set the inner HTML using a template literal to display some info about each game
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
            <p>Goal: $${game.goal.toLocaleString()}</p>
            <p>Backers: ${game.backers.toLocaleString()}</p>
        `;

        // Append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// Call the function to display all games on the page
addGamesToPage(GAMES_JSON);
   


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container



// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/


// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

contributionsCard.innerHTML = totalContributions.toLocaleString();

const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0); // use reduce() to count the number of total contributions by summing the backers





// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;// set the inner HTML using a template literal and toLocaleString to get a number with commas


// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = GAMES_JSON.length;
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

   // Show only games that do not yet have enough funding
function filterUnfundedOnly() {
    // Step 1: Clear the existing games from the DOM
    deleteChildElements(gamesContainer);

    // Step 2: Use filter() to get games where pledged < goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Step 3: Use addGamesToPage to display the unfunded games
    addGamesToPage(unfundedGames);

    // Step 4: Log the length of the unfunded games array to find the secret key component
    console.log(unfundedGames.length);
}
 // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM



// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    // Use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Use console.log to check the length of fundedGames (optional)
    console.log(fundedGames.length);

    // Use the addGamesToPage function to display the funded games
    addGamesToPage(fundedGames); // add all games from the JSON data to the DOM


    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
// Add all games to the DOM
addGamesToPage(GAMES_JSON);
    
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");

const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);// add event listeners with the correct functions to each button
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
const numUnfundedGames = unfundedGames.length;


// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `
  A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games.
  Currently, ${numUnfundedGames} ${numUnfundedGames === 1 ? "game remains" : "games remain"} unfunded.
  We need your help to fund these amazing games!
`;

// Create a new <p> element
const paragraph = document.createElement("p");

// Set the inner HTML of the paragraph to the display string
paragraph.innerHTML = displayStr;

// Append the paragraph to the description container
descriptionContainer.appendChild(paragraph);

// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});


// Use destructuring to grab the first and second games
const [firstGame, secondGame] = sortedGames;

// Create a new element for the first game and append it
const firstGameName = document.createElement("p");
firstGameName.innerText = firstGame.name;
firstGameContainer.appendChild(firstGameName);

// Create a new element for the second game and append it
const secondGameName = document.createElement("p");
secondGameName.innerText = secondGame.name;
secondGameContainer.appendChild(secondGameName);
// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item
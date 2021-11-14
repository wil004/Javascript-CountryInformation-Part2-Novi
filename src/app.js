import axios from 'axios';


// Makes an identifier variable for the countryInformation div.
const countryInformation = document.getElementById('countryInformation');


//Makes the searchbar and button in a div together
const searchBar = document.createElement("div");
searchBar.setAttribute('style', 'border: 1px solid black;')
searchBar.innerHTML = `
                <input type="text" id="searchText"/>
                <button id='submitSearch' style="background-color: green">Submit</button>
             `;


// Makes sure the form doesn't change back to default after submitting.
const preventDefault = (e) => {
    e.preventDefault();
}
countryInformation.addEventListener('click', preventDefault)

//Puts the searchbar in the countryInformation form.
countryInformation.appendChild(searchBar);

// Makes identifier variables of the above created submit and searchbar.
const submitSearch = document.getElementById('submitSearch');
const searchText = document.getElementById('searchText');


// The async function that fetches data through an api.
async function getCountries() {
    try {

        //Gets data
        const result = await axios.get('https://restcountries.com/v2/all');

        // Puts the array with objects we got in a variable
        const allData = result.data;

        //An indexNumber to identify a specific object in this case a country!
        let indexNumber;


        // Function that is being called when user puts something in the search field!
        // If the user input exists it will connect the input to the index number, identifying the object array[indexNumber].
        const search = (e) => {
           // returns the names of the objects
            const names = allData.map((item) => {
              return item.name
            })
            //Checks if the input name exists in the array object, if it does then it returns the indexNumber of the array where the object is located in.
            if (names.includes(e.target.value)) {
                   for (let i = 0; i < names.length; i++) {
                       if (names[i] === e.target.value) {
                           indexNumber = i;
                       }
                   }
               }

               //If the name does not exist it will return false!
               else {
                   indexNumber = false;
               }
        }


        // Makes a div where the country name and flag will be located in!
        const flagAndTitle = document.createElement('div');
        flagAndTitle.setAttribute('style', 'display: flex; align-items: center;' +
            'justify-content: center;');

        // Makes a div where the country description will be located in!
        const countryDescription = document.createElement('div');


        // A function that pushes data in the flagAndTitle and countryDescription divs after submitting!
const printCountry = () => {
    //If an indexNumber is connected it will play everything inside this if statement.
    if (indexNumber === 0 || indexNumber > 0 && indexNumber < allData.length) {

        // The languages variable checks whether a country has 1 or multiple languages!
        //If a country has multiple languages it will make it look good in the div!
        const languages = allData[indexNumber].languages.map((item) => {
            return item.name
        })
        for (let i = 1; i < languages.length; i++) {
            if (i < languages.length - 1) {
                languages[0] = languages[0] + ', ' + languages[i];
            }
            else if (i === languages.length - 1) {
                languages[0] = languages[0] + ' and ' + languages[i];
            }
        }

    //Checks if the country has 1 or multiple currencies if it does not it will print one and otherwise it will make it look good in the div.
        const currencies = allData[indexNumber].currencies.map((item) => {
            return item.name
        })

        for (let i = 1; i < currencies.length; i++) {
            currencies[0] = currencies[0] + ' and ' + currencies[i];
        }


    //Puts the data in the flagAndTitle div.
        flagAndTitle.innerHTML = `
                <img width="60" height="40" src="${allData[indexNumber].flag}"> <h1>${allData[indexNumber].name}</h1>
                `

        // Puts the data in the countryDescription div.
        countryDescription.innerHTML = `<p>${allData[indexNumber].name} is located in ${allData[indexNumber].subregion} people.
            It has a population of ${allData[indexNumber].population}</p>
                <p>The capital is ${allData[indexNumber].capital} and you can pay with: ${currencies[0]}</p>
                <p>They speak the language(s): ${languages[0]}</p>
                `
        countryInformation.appendChild(flagAndTitle)
        countryInformation.appendChild(countryDescription)

        // If a user puts in a wrong input it will open the else if statement below!
        // In this else if statement the countryInformation form gets a red background-color with the style attribute!
        //If he afterwards puts in a correct input the red color has to be removed, just like what happens below!
        countryInformation.removeAttribute('style');
    }

    // If the indexNumber does not exist because of a wrong input the indexNumber will be false
        // and everything in this else if statement will be played.
    else if (indexNumber === false) {
        flagAndTitle.innerHTML = `
        <h2 id="ERROR"> This is not a country please fill in a valid value!</h2>
        `

        countryDescription.innerHTML = `
        <p> Fill in a country that exists or capitalize the first letter so we can provide you with information!</p>
        `
        countryInformation.setAttribute('style', 'background-color: red;')
        countryInformation.appendChild(flagAndTitle)
        countryInformation.appendChild(countryDescription)
    }
}
        //Dropdown additionaly created by me!
        const dropMenu = document.getElementById('dropMenu');
        const dropdown = document.createElement('select');
        dropMenu.appendChild(dropdown);
        const options = [];
        const dropdownMenu = allData.map((item) => {
            return item.name
        })
        dropdownMenu.unshift('Choose country!')
        const dropDownFunction = (e) => {
            for (let i = 0; i < dropdownMenu.length; i++) {
                options[i] = document.createElement('option');
                options[i].textContent = dropdownMenu[i];
                dropdown.appendChild(options[i]);
            }
        }
        dropDownFunction()


        const dropDownSearchFunction = (e) => {
            searchText.value = e.target.options[e.target.selectedIndex].value
            for(let i = 0; i < allData.length; i++) {
                if (allData[i].name === searchText.value)
                    indexNumber = i
            }
        }
                dropMenu.addEventListener('click', dropDownSearchFunction);
// End of the dropdown menu for questions don't hesitate to ask me!


        // Adds eventlisteners to the searchText and submitSearch bar by using it's identifiers that are declared above the async function!
        searchText.addEventListener("keyup", search);
        submitSearch.addEventListener('click', printCountry);
        //Allows you to also press enter in the input field!
        searchText.addEventListener('keyup', function(e) {
            if (e.keyCode === 13) {
                return printCountry();
            }
        });
        }

    catch (e) {
        console.error(e);
    }
}

getCountries()








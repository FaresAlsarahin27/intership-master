fetch("../data/internship.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // check data
    // Define an array of objects containing the ///Internship 2 HTML element selectors and their corresponding JSON properties
    const elements = [
      { selector: "#year span", property: "Year" },
      { selector: "#company span", property: "Company" },
      { selector: "#JobTitle span", property: "JobTitle" },
      { selector: "#duration span", property: "Duration" },
      { selector: "#status span", property: "Status" },
    ];
    // Loop through the elements array and update the HTML content
    elements.forEach((element) => {
      const elementNode = document.querySelector(element.selector);
      elementNode.textContent = `${element.property}: ${
        data.Internships[element.property]
      }`;
    });
  });

// Define a function to fetch JSON data and update the HTML content
function updateContent(jsonUrl) {
  fetch(jsonUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // check data
      // Define an array of objects containing the HTML element selectors and their corresponding JSON properties
      const elements = [
        { selector: "#yearApp p", property: "Year" },
        { selector: "#companyApp p", property: "Company" },
        { selector: "#JobTitleApp p", property: "JobTitle" },
        { selector: "#durationApp p", property: "Duration" },
        { selector: "#statusApp p", property: "Status" },
      ];
      // Loop through the elements array and update the HTML content
      elements.forEach((element) => {
        const elementNode = document.querySelector(element.selector);
        elementNode.textContent = `${data.Internships[element.property]}`;
      });
    });
}

// Define the current JSON file path and get the corresponding link element
let currentJson2 = '../data/internship.json';
let currentLink = document.getElementById('button1');

// Listen for keydown events on the document object
window.addEventListener('keydown', function(event) {
  // Check if the key pressed was the Enter key (key code 32 (SpaceBar))
  if (event.keyCode === 32) {
    // Switch to the other JSON file
    const newJson = (currentJson2 === '../data/internship.json') ? '../data/InternshipTwo.json' : (currentJson2 === '../data/InternshipTwo.json') ? '../data/InternshipThree.json' : '../data/internship.json';
    // Get the link element that corresponds to the new JSON file path
    let newLink = document.querySelector(`[data-json="${newJson}"]`);
    // Remove the "active" class from the current link and add it to the new link
    currentLink.classList.remove('active');
    newLink.classList.add('active');
    // Update the current JSON file path and link element
    currentJson2 = newJson;
    currentLink = newLink;
    // Call the updateContent() function with the new JSON file path
    updateContent(newJson);
  }
});

// Call the updateContent() function with the URL of the first JSON file
updateContent(currentJson2);

/************/


// // Call the updateContent() function with the URL of the first JSON file
// updateContent('../data/internship.json');
// // Add an event listener to a button that switches between JSON files and updates the HTML content
// const mybutton = document.getElementById('switch-button');
// mybutton.addEventListener('click', function() {
//   // Check the current JSON file path and switch to the other file
//   const currentJson = mybutton.dataset.json;
//   const newJson = (currentJson === '../data/internship.json') ? '../data/InternshipTwo.json' : (currentJson === '../data/InternshipTwo.json') ? '../data/InternshipThree.json' : '../data/internship.json';
//   // Update the button data attribute with the new JSON file path
//   mybutton.dataset.json = newJson;
//   // Call the updateContent() function with the new JSON file path
//   updateContent(newJson);
// });




// .catch(error => console.error(error));
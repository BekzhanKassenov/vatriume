var suggstionBox, suggestionLabel, repeatLabel, repeatButton, submitButton;
var radio1, radio2, radio3, radio4;
var database;

function init() {
  suggestionLabel = document.getElementById("suggestionLabelId");
  repeatLabel = document.getElementById("repeatLabelId");
  repeatButton = document.getElementById("repeatButtonId");
  submitButton = document.getElementById("submitButtonId");
  radio1 = document.getElementById("radio1");
  radio2 = document.getElementById("radio2");
  radio3 = document.getElementById("radio3");
  radio4 = document.getElementById("radio4");
  
  // Get a reference to the database service
  database = firebase.database();      
}

function saveSuggestion() {
  var suggestionText = suggestionLabel.value;
  var destination = "unknown";

  if (radio1.checked) {
    destination = "vatriume";
  } else if (radio2.checked) {
    destination = "market";
  } else if (radio3.checked) {
    destination = "ladies";
  } else if (radio4.checked) {
    destination = "tumba";
  }

  if (suggestionText.length > 0) {
    var mDate = new Date();
    var newRef = database.ref('suggestions/').push();
    newRef.set({
      "text" : suggestionText,
      "destination" : destination,
      "timestamp" : mDate.toString(),
      "status" : 0
    });
    
    suggestionLabel.value = "";
    suggestionLabel.style.display = "none";
    submitButtonId.style.display = "none";
    repeatLabel.style.display = "block";
    repeatButton.style.display = "block";
 
  }
}

function reloadSuggestionBox() {
  suggestionLabel.style.display = "block";
  submitButtonId.style.display = "block";
  repeatLabel.style.display = "none";
  repeatButton.style.display = "none";        
}
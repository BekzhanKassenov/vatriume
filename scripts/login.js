var database;
var emailText;
var passwordText;

function init() {
	emailText = document.getElementById("emailId");
	passwordText = document.getElementById("passwordId");
	
	// Get a reference to the database service
  	database = firebase.database();

  	firebase.auth().onAuthStateChanged(function(user) {
  		if (user) {
    		// User is signed in.
    		window.location = "suggestions.html";
  		} else {
    		// No user is signed in.
  		}
	});      
}

function signin() {
	var email = emailText.value;
	var password = passwordText.value;


	firebase.auth().signInWithEmailAndPassword(email, password).catch(
		function(error) {
		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		alert(errorCode + " " + errorMessage);
	});


}
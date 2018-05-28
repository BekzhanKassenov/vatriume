var database;
var suggestionsDiv;
var loadingIndicator;
var suggestions = [];

function init() {
	suggestionsDiv = document.getElementById("suggestionsDivId");
	loadingIndicator = document.getElementById("suggestionLoaderInfo");
	// Get a reference to the database service
  	database = firebase.database();
	loadingIndicator.innerHTML = "Загружаю, подождите..";

  var clipboard = new Clipboard('.btn');

clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);

    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});

  	firebase.auth().onAuthStateChanged(function(user) {
  		if (user) {
    		// User is signed in.
    		loadingIndicator.style.visibility = "hidden";
    		showSuggestions();
  		} else {
    		// No user is signed in.
    		window.location = "login.html";
  		}
	}); 


}

function showSuggestions() {
	var suggestionsRef = firebase.database().ref('suggestions');
	var pusto = true;
	suggestionsRef.once('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
    		//var childKey = childSnapshot.key();
    		var nextSuggestion = childSnapshot.val();
    		//suggestions.push(nextSuggestion.text);
    		if (nextSuggestion.status == "0") {
    			pusto = false;
    			displayNext(nextSuggestion.text, childSnapshot.key, nextSuggestion.timestamp, nextSuggestion.destination);
    		}
  		});
	});

	if (pusto == true) {
		loadingIndicator.style.visibility = "visible";
		loadingIndicator.innerHTML = "Пусто :(";
	} else {
		loadingIndicator.style.visibility = "hidden";
	}
}

function displayNext(text, key, timestamp, destination) {
	loadingIndicator.style.visibility = "hidden";
	var textik = text;
	text = text.replace(/(?:\r\n|\r|\n)/g, '<br />');

  console.log(destination);

  if (destination != "vatriume" && destination != "ladies" && destination != "market" && destination != "tumba") {
    destination = "vatriume";
  }

  var copyText = textik.replace(new RegExp("\"", 'g'), "\'");

	suggestionsDiv.innerHTML += "<div class='"+destination+"' id=\"" + key + "\">" 
	+ text
	+ "<br><span class='label label-info'>" + timestamp + "</span>"
	+ "<button class='btn btn-danger' onclick='removeSuggestion(\"" + key + "\")'>Стереть</button>"
  + "<buton class='btn btn-info' data-clipboard-demo data-clipboard-action='copy' data-clipboard-text=\""+copyText+"\">Скопировать</button>"
	+ "</div>";
}


function removeSuggestion(key) {
	var suggestionsRef = firebase.database().ref('suggestions/' + key);
	var updates = {};
  	updates["/status"] = "1";
  	suggestionsRef.update(updates);

  	var well = document.getElementById(key);
  	if (well) {
  		well.style.display = 'none';
  	}
}

function deleteAllNafig() {
	var suggestionsRef = firebase.database().ref('suggestions');
	suggestionsRef.once('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
    		//var childKey = childSnapshot.key();
    		var nextSuggestion = childSnapshot.val();
    		//suggestions.push(nextSuggestion.text);
    		if (nextSuggestion.status == "0") {
    			removeSuggestion(childSnapshot.key);
    		}
  		});
	});
}
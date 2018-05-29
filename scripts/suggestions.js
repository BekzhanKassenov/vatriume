function loadSuggestions() {
	$('#suggestionLoaderInfo').text("Загружаю, подождите...");
	
	// Cache Mustache template
	var template = $('#suggestionTemplate').html();
	Mustache.parse(template);

	$.ajax({
		url: 'api/load_suggestions.php',
		type: 'GET'
	}).done(function(data) {
		var found = false;
		for (suggestion in data) {
			displayNext(suggestion);
			found = true;
		}

		if (!found) {
			$('#suggestionLoaderInfo').text('Пусто :(')
			$('#suggestionLoaderInfo').show();
		} else {
			$('#suggestionLoaderInfo').hide()
		}
	}).fail(function (error) {
		if (error.status == 401) {
			window.location.replace('login.html');
		}
	});
}

function displayNext(data) {
	$('#suggestionLoaderInfo').hide()

	data.copyText = data.text.replace(new RegExp("\"", 'g'), "\'");
	data.text = data.text.replace(/(?:\r\n|\r|\n)/g, '<br />');
	if (["vatriume", "ladies", "market", "tumba"].indexOf(data.destination) == -1) {
		data.destination = "vatriume";
	}

	$("#suggestionsDivId").append(Mustache.render( $('#suggestionTemplate').html(), data));
}

function removeSuggestion(keyToDelete) {
	$.ajax({
		url: 'api/remove_suggestions.php',
		type: 'GET',
		data: {
			key: keyToDelete
		}
	}).done(function(data) {
		$('#' + keyToDelete).hide();
	});
}

function deleteAllNafig() {
	$.ajax({
		url: 'api/remove_suggestions.php',
		type: 'GET',
		data: {
			delete_all: true
		}
	}).done(function(data) {
		window.location.replace('suggestions.html');
	});
}
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
    $.each(data, function (idx, suggestion) {
      displayNext(suggestion);
      found = true;
    });

    if (!found) {
      $('#suggestionLoaderInfo').text('Пусто :(')
      $('#suggestionLoaderInfo').show();
    } else {
      $('#suggestionLoaderInfo').hide()
    }
  }).fail(function(error) {
    if (error.status == 401) {
      window.location.replace('login.html');
    } else {
      $('#suggestionLoaderInfo').text('Ошибочка...')
    }
  });
}

function displayNext(suggestion) {
  $('#suggestionLoaderInfo').hide();

  suggestion.copyText = suggestion.text.replace(new RegExp("\"", 'g'), "\'");
  suggestion.text = suggestion.text.replace(/(?:\\r\\n|\\r|\\n)/g, '\n');
  if (["vatriume", "ladies", "market", "tumba"].indexOf(suggestion.destination) == -1) {
    suggestion.destination = "vatriume";
  }

  $("#suggestionsDivId").append(Mustache.render($('#suggestionTemplate').html(), suggestion));
}

function removeSuggestion(idToDelete) {
  $.ajax({
    url: 'api/remove_suggestions.php',
    type: 'GET',
    data: {
      id: idToDelete
    }
  }).done(function(data) {
    $('#' + idToDelete).hide();
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
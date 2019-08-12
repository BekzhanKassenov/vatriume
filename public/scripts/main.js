function saveSuggestion() {
  var suggestionText = $('#suggestionLabelId').val();
  var destination = 'unknown';

  if ($('#radio1').is(':checked')) {
    destination = 'vatriume';
  }
  else if ($('#radio2').is(':checked')) {
    destination = 'market';
  }
  else if ($('#radio3').is(':checked')) {
    destination = 'ladies';
  }
  else if ($('#radio4').is(':checked')) {
    destination = 'tumba';
  }

  if (suggestionText.length > 0) {
    var mDate = new Date();
    $.ajax({
      url: 'api/store_suggestion.php',
      type: 'GET',
      data: {
        text: suggestionText,
        destination: destination,
        timestamp: mDate.toString()
      }
    }).done(function(data) {
      $('#suggestionLabelId').val('');
      $('#suggestionLabelId').hide();
      $('#submitButtonId').hide();
      $('#repeatLabelId').show();
      $('#repeatButtonId').show();
    });
  }
}

function reloadSuggestionBox() {
  $('#suggestionLabelId').show();
  $('#submitButtonId').show();
  $('#repeatLabelId').hide();
  $('#repeatButtonId').hide();
}
function saveSuggestion() {
  var suggestionText = suggestionLabel.value;
  var destination = 'unknown';

  if ($('#radio1').checked) {
    destination = 'vatriume';
  }
  else if ($('#radio2').checked) {
    destination = 'market';
  }
  else if ($('#radio3').checked) {
    destination = 'ladies';
  }
  else if ($('#radio4').checked) {
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
    });

    $('#suggestionLabelId').text('');
    $('#suggestionLabelId').hide();
    $('#submitButtonId').hide();
    $('#repeatLabelId').show();
    $('#repeatButtonId').show();
  }
}

function reloadSuggestionBox() {
  $('#suggestionLabelId').show();
  $('#submitButtonId').show();
  $('#repeatLabelId').hide();
  $('#repeatButtonId').hide();
}
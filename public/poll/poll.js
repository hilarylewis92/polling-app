const socket = io();

$(document).ready(function() {
  const pollId = getParameterByName('pollId')

  getPollData(pollId)
});

function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getPollData(pollId) {
  $.get(`/api/poll/${pollId}`, function(data) {
    $('.poll-question').append(`<h3>${data.info.poll.question}</h3>`)
    $('.poll-option-1').append(`<input type='submit' value='${data.info.poll.options[0].option}'/>`)
    $('.poll-option-2').append(`<input type='submit' value='${data.info.poll.options[1].option}'/>`)
    $('.poll-option-3').append(`<input type='submit' value='${data.info.poll.options[2].option}'/>`)
    $('.poll-option-4').append(`<input type='submit' value='${data.info.poll.options[3].option}'/>`)
  });
}

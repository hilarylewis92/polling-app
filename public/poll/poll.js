// right away, search url for query params
// determine if there is a query param called pollId
// if so, store that value in a variable
// then do a get request to the server for that poll
// $.get(`/api/poll/${pollId}`)
// append that returned data to the dom

$(document).ready(function() {
  const pollId = getParameterByName('pollId')

  getPollData(pollId)
});


const getPollData = (pollId) => {
  $.get(`/api/poll/${pollId}`, function(data) {
    $('.poll-question').append(data.info.poll.question)
    $('.poll-option-1').append(data.info.poll.options[0].option)
    $('.poll-option-2').append(data.info.poll.options[1].option)
    $('.poll-option-3').append(data.info.poll.options[2].option)
    $('.poll-option-4').append(data.info.poll.options[3].option)
  });

  // console.log(pollId);
  // return fetch(`/api/poll/${pollID}`)
  //   .then( res => {
  //     console.log(res);
  //     return res.json();
  // })
  // debugger;

  // $.get(`/api/poll/${pollId}`, {
  //   console.log(res);
  //   // .then( res => {
  //   //   console.log(res);
  //   //   return res.json();
  //   // })
  // }
    // console.log(pollId);
  // );
}


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


// const getPoll = (pollID) => {
//   debugger;
//   return fetch(`/api/poll/${pollID}`)
//     .then( res => {
//       return res.json();
//     })
// }
// window.location.href.substr(window.location.href.lastIndexOf('/') + 1)

// $.get('/api/poll/:id', function(data) {
//
//   // console.log(data.info);
//   // let question = data.info.poll.question
//   // $('.poll-question').append('<h2>question<h2>')
// })

const socket = io()

const connectionCount = document.getElementById('connection-count')
const statusMessage = document.getElementById('status-message')
const buttons = document.querySelectorAll('#choices button')
const voteCount = document.getElementById('vote-message')

$(document).ready(function() {
  const pollId = getParameterByName('pollId')
  getPollData(pollId)
})

function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href
  }
  name = name.replace(/[\[\]]/g, "\\$&")
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
  results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}

function getPollData(pollId) {
  $.get(`/api/poll/${pollId}`, function(data) {
    $('.poll-question').append(`<h3>${data.info.poll.question}</h3>`)
    $('.option-1').append(data.info.poll.options[0].option)
    $('.option-2').append(data.info.poll.options[1].option)
    $('.option-3').append(data.info.poll.options[2].option)
    $('.option-4').append(data.info.poll.options[3].option)
  })
}

socket.on('usersConnected', (count) => {
  connectionCount.innerText = 'Connected Users: ' + count
})

socket.on('statusMessage', (message) => {
  statusMessage.innerText = message
})

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    socket.send('voteCast', this.innerText)
  })
}

socket.on('voteCount', (votes, user) => {
  let votedFor = Object.keys(votes).map(vote => {
    return vote + ':' + votes[vote]
  })
  voteCount.innerText = votedFor
})

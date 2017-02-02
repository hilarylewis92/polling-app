$('.create-poll-btn').on('click', (e) => {
  e.preventDefault()

  const createPoll = {
    question: $('.create-poll-question').val(),
    options: [
      {
        id: 1,
        option:$('.create-poll-option-one').val()
      },
      {
        id: 2,
        option:$('.create-poll-option-two').val()
      },
      {
        id: 3,
        option:$('.create-poll-option-three').val()
      },
      {
        id: 4,
        option:$('.create-poll-option-four').val()
      }
    ]
  }

  // $.post('/form', {
  //   'poll': createPoll
  // })

  fetch(`/form`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      poll: createPoll
    })
  }).then(res => {
    return res.json()
  }).then(json => {
    console.log(json);
    return window.location = `/poll/?pollId=${json.id}`
  })
})

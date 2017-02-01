$('.create-poll-btn').on('click', (e) => {
  e.preventDefault()

  const createPoll = {
    id: 1,
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
  console.log(createPoll);
})

$('.create-poll-btn').on('click', (e) => {
  e.preventDefault()

  axios.post('/form', {
    poll: 'hello'
  })
})

  //   const createPoll = {
  //     id: 1,
  //     question: $('.create-poll-question').val(),
  //     options: [
  //       {
  //         id: 1,
  //         option:$('.create-poll-option-one').val()
  //       },
  //       {
  //         id: 2,
  //         option:$('.create-poll-option-two').val()
  //       },
  //       {
  //         id: 3,
  //         option:$('.create-poll-option-three').val()
  //       },
  //       {
  //         id: 4,
  //         option:$('.create-poll-option-four').val()
  //       }
  //     ]
  //   }
  //
  //   fetch(`/form`, {
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     method: 'post',
  //     body: JSON.stringify({
  //       poll: createPoll
  //    })
  //   })
  //   .catch((err) => {
  //      console.error(err);
  //   })
  // })

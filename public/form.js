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

    fetch(`/form`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        poll: createPoll
     })
    })
    .catch((err) => {
       console.error(err);
    })
  })


  // axios.post('/form', {
  //   data: {poll:'hello'}
  // })


// const question = $('.create-poll-question').val();
// const optionOne = $('.create-poll-option-one').val();
// const optionTwo = $('.create-poll-option-two').val();
// const optionThree = $('.create-poll-option-three').val();
// const optionFour = $('.create-poll-option-three').val();

// axios({
//   url: '/form',
//   method: 'post',
//   data: {
//     question: question,
//     optionOne: optionOne,
//     optionTwo: optionTwo,
//     optionThree: optionThree,
//     optionFour: optionFour
//   }
// });
//   axios({
//   method: 'post',
//   url: '/form',
//   data: {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   }
// });
// })

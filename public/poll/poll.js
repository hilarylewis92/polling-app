// $(document).ready(function() {
//   fetch(`/poll`, {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     method: 'get'
//   })
//   .then((res) => console.log(res.body))
//   .catch((err) => {
//     console.error(err);
//   })
// })

  $.get('/api/post/:id', function(data) => {
    console.log(data);
  })
//     .then((res) => console.log('response', res))
// })

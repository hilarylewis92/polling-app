$(document).ready(function() {
  fetch('/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'get'
  })
  .then((res) => console.log(res.body))
  .catch((err) => {
    console.error(err);
  })
})

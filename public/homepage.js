const token = localStorage.getItem("Bearer");

function fetchCall() {
  fetch('/api/track', {
    headers: {
      "Authorization": `Bearer ${token}`
    },
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    }
    throw new Error(res.statusText)
  })
  .catch(err => {
    $(location).attr('href', '/index.html');
  })
}

function renderInputForm() {
  $('main').on('click', '.input-daily', function() {
    $('#homepage').html('');
  }) 
};

function logOut() {
  $('.logout').on('click', function() {
    localStorage.removeItem("Bearer");
    $(location).attr('href', './index.html')
  })
}

function runHomepage() {
  logOut();
  fetchCall();
}

$(runHomepage);

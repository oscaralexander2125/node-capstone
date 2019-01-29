function renderInputForm() {
  $('main').on('click', '.input-daily', function() {
    $('#homepage').html('');
  }) 
};

function logOut() {
  $('.logout').on('click', function() {
    $(location).attr('href', './index.html')
  })
}

function runHomepage() {
  logOut();
}

$(runHomepage);
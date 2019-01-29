function loginUser() {
  console.log('hello');
  $('.login-form').on('submit', function(event) {
    event.preventDefault();
    const userInfo = {};
    userInfo.email = $('#email').val();
    userInfo.password = $('#password').val();
    redirectHomepage(userInfo);
  })
}

function redirectHomepage(userCreds) {
  fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userCreds)
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  })
  .then(responseJson => {
    
  })
}

function registerUser() {
  $('.new-user').on('submit', function(event) {
    event.preventDefault();
    const newUser = {};
    newUser.email = $('#register-email').val();
    newUser.firstName = $('#firstName').val();
    newUser.lastName = $('#lastName').val();
    if($('#register-password').val() !== $('#confirm-password').val()) {
      $('.error-message').html('');
      $('.error-message').html(`<p>Passwords must match.</p>`)
    }
    else {
      newUser.password = $('#confirm-password').val();
      createUser(newUser)
    }
  });
console.log('hello2');

}

function createUser(user) {
  fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText)
  })
  .then(() => {
    $(location).attr('href', './homepage.html')
  })
  .catch(err => {
    console.log(`Something went wrong: ${err.message}`)
  });
}

function runLoginPage() {
  registerUser();
  loginUser();
}

$(runLoginPage);
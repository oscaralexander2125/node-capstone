let email;
let aToken;

function loginUser() {
  console.log('hello');
  $('.login-form').on('submit', function(event) {
    event.preventDefault();
    const userInfo = {};
    userInfo.username = $('#email').val();
    userInfo.password = $('#password').val();
    directHomepage(userInfo);
  })
}

function directHomepage(userCreds) {
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
    //aToken = responseJson.authToken
    localStorage.setItem("Bearer", responseJson.authToken)
    $(location).attr('href', '/homepage.html');
  })
  .catch(err => {
    loginError(err);
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
      $('.register-error').html('');
      $('.register-error').html(`<p>Passwords must match.</p>`)
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
    const userCred = {};
    userCred.username = user.email;
    userCred.password = user.password;
    directHomepage(userCred);
  })
  .catch(err => {
    signUpError(err)
  });
}

function loginError(error) {
  $('.login-error').html('');
  $('.login-error').append(`Email or password incorrect.`);
}

function signUpError(error) {
  $('.register-error').html('');
  $('.register-error').html(`<p>${error}</p>`);
}

function runLoginPage() {
  registerUser();
  loginUser();
}

$(runLoginPage);
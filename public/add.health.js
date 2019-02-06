let i = 1;
let token = localStorage.getItem("Bearer");

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

function addMeal() {
  $('.add-meal').on('click', function() {
    renderRemoveButton(i);
    addMealNumber();
    if(i<8) {
      $('.meal-list').append(`<li class="meal-${i}">
      <label for="meal${i}" class="meal${i}">Meal <span class="meal-number">${i}</span></label>
      <input type="text" id="meal${i}">
      </li>`);
      console.log(i);
    }
    else {
      i=7;

    }
  })
};

function renderRemoveButton(i) {
  console.log(i + 'from remove button');
  if(i===1) {
    $('.remove-meal').remove();
    $('.meal-buttons').append(`<button type="button" class="remove-meal">Remove meal</button>`)
  } 
};

function addMealNumber() {
  i+=1;
};

function removeMeal() {
  $('.logger').on('click', '.remove-meal', function() {
    console.log('hello from remove button');
    $('.meal-list').find(`.meal-${i}`).remove();
    removeMealNumber();
    iPositive();
  })
}

function removeMealNumber() {
  if(i<8) {
    i-=1;    
  }
  if (i>=8) {
    i=7;
  }
}

function iPositive() {
  if(i < 1) {
    i =0;
    console.log('keep i > ' + i);
  }
}

function getClientInfoForTheDay() {
  console.log('get client info function wired correctly')
  $('form').on('submit', (event) => {
    event.preventDefault();
    console.log('something happens in fetch function');
    const dailyData = {};
    const inputDate = $('#date').val()+'T12:24:00';
    const date = new Date(inputDate);
    const finalDate = date.toISOString();
    dailyData.weight = $('#weight').val();
    dailyData.date = finalDate;
    if ($('#burned').val() !== '') {
      dailyData.caloriesBurned = $('#burned').val();
    }

    if ($('#consumed').val() !== '') {
      dailyData.caloriesConsumed = $('#consumed').val();
    }
    
    dailyData.meals = [];
    //dailyData.created = Date.now;

    for(let j=0; j < i; j++) {
      dailyData.meals.push(
        $(`#meal${j+1}`).val(),
      );
    };
    const mealArray = dailyData.meals.filter(meal => meal !== "");
    dailyData.meals = mealArray;
    addProgress(dailyData); 
  })  
};

function addProgress(updateData) {
  console.log('something happens in fetch function ');
  fetch ('/api/track', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(updateData)
  })
  .then(res => {
    if(res.ok) {
      return res.json()
    }
    throw new Error(res.statusText);
  })
  .then(responseJson => {
    confirmDataIsAdded();
    $(location).attr('href', '/progress-page.html')
  })
  .catch(err => {
    renderError(`${err.message}`)
  });
}

function confirmDataIsAdded() {
  $('.confirm-post').html('');
  $('.confirm-post').html(`<p>Successfully Added! Go to the Progress Page to look at your most recent progress.</p>`);
}

function renderError(error) {
  $('.display-error').html('');
  $('display-error').html(`<p>${error}</p>`);
}

function runApp() {
  addMeal();
  removeMeal();
  getClientInfoForTheDay();
  fetchCall();
}

$(runApp);
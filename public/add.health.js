let i = 1;


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
      console.log('max of 7 meals');
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
  i-=1;
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
    dailyData.weight = $('#weight').val();
    dailyData.caloriesBurned = $('#burned').val();
    dailyData.caloriesConsumed = $('#consumed').val();
    dailyData.meals = [];
    dailyData.created = Date.now;

    for(let j=0; j < i; j++) {
      dailyData.meals.push({
        meal : $(`#meal${j+1}`).val(),
      });
    };
    console.log(dailyData);
    addProgress(dailyData); 
  })  
};

function addProgress(updateData) {
  console.log('something happens in fetch function');
  fetch ('/api/track', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  })
  .then(res => {
    if(res.ok) {
      return res.json()
    }
    throw new Error(res.statusText);
  })
  .then(responseJson => console.log(responseJson))
  .catch(err => {
    console.log(`something went wrong: ${err.message}`)
  });
}

function runApp() {
  addMeal();
  removeMeal();
  getClientInfoForTheDay();
}

$(runApp);
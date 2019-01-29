

function getData() {
  return fetch('/api/track')
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
}

function getProgressData() {
  //will be used to get data from api
  fetch('/api/track')
  .then(res => {
    if(res.ok) {
      return res.json();
    }
    throw new Error(res.statusText)
  })
  .then(responseJson => displayProgress(responseJson))
  .catch(err => {
    console.log(`Something went wrong: ${err.message}`);
  });
}

//will need at add calories burned and consumed and meal to the real api
function displayProgress(data) {
  console.log(data);
  let idValue;
  for (let i = 0; i < 7; i++) {
    $('.day').append(`Weight: ${data[i].weight}<br /> Calories expended: ${data[i].caloriesBurned}<br /> Caloric intake: ${data[i].caloriesConsumed}<br />`);
    for (let j=0; j < data[i].meals.length; j++) {
      $('.day').append(`Meal ${j+1}: ${data[i].meals[j]} <br />`);
    }
    idValue = data[i].id;
    $('.day').append(`<button type="button" class="edit-form" onClick ="saveEditForm(${idValue})">Edit</button>`);
    $('.day').append(`<button type="button" class="delete-form">Delete</button><br />`);
    console.log(typeof data[i].id);
  }
};

function lastSevenDays() {
  console.log('seven days function wired');
  $('.7-days').on('click', function() {
    $('.day').html('');
    getProgressData();
  });
}


function lastThirtyDays() {
  $('.30-days').on('click', function() {
    getData()
    .then(data => {
      $('.day').html('');
      if(data.length < 30) {
        for (let k = 0; k < data.length; k++) {
          $('.day').append(`Weight: ${data[k].weight}<br /> Calories expended: ${data[k].caloriesBurned}<br /> Caloric intake: ${data[k].caloriesConsumed}<br />`)
          for (let j=0; j < data[k].meals.length; j++) {
            $('.day').append(`Meal ${j+1}: ${data[k].meals[j]} <br />`);
          }
          $('.day').append(`<button type="button" class="edit-form-${k}" onclick="saveEditForm(${data[k].id})">Edit</button>`);
          $('.day').append(`<button type="button" class="delete-form">Delete</button><br />`);
        }
      } else {
        for (let k = 0; k < 30; k++) {
          $('.day').append(`Weight: ${data[k].weight}<br /> Calories expended: ${data[k].caloriesBurned}<br /> Caloric intake: ${data[k].caloriesConsumed}<br />`)
          for (let j=0; j < data[k].meals.length; j++) {
            $('.day').append(`Meal ${j+1}: ${data[k].meals[j]} <br />`);
          }
          $('.day').append(`<button type="button" class="edit-form-${k}" onClick ="saveEditForm(${data[k].id})">Edit</button>`);
          $('.day').append(`<button type="button" class="delete-form">Delete</button><br />`);
        }
      }
    })
    .catch(err => {
      console.log(`Something went wrong: ${err.message}`);
    });
  });
}

function allDays() {
  $('.all-days').on('click', function() {
    getData()
    .then(data => {
      $('.day').html('');
      for (let k = 0; k < data.length; k++) {
        $('.day').append(`Weight: ${data[k].weight}<br /> Calories expended: ${data[k].caloriesBurned}<br /> Caloric intake: ${data[k].caloriesConsumed}<br />`)
        for (let j=0; j < data[k].meals.length; j++) {
          $('.day').append(`Meal ${j+1}: ${data[k].meals[j]} <br />`);
        }
        $('.day').append(`<button type="button" class="edit-form" onclick ="saveEditForm(${data[k].id})">Edit</button>`);
        $('.day').append(`<button type="button" class="delete-form">Delete</button><br />`);
      }
    })
    .catch(err => {
      console.log(`Something went wrong: ${err.message}`);
    });
  });
}
function editForm() {
  $('.day').on('click', '.edit-form', function() {
    //console.log(dayId);
    $('header').hide();
    $('.buttons').hide();
    $('.display-progress').hide();
    renderEditForm();
  })
}

function renderEditForm() {
  $('main').html(`<section role = "region" class = "edit-page">
  <form class = "edit-form">
    <legend>Edit Day</legent>
    <label for = "weight">Weight: </label>
    <input type="number" id="weight" />
    <label for="burned" class="burned">Caloried burned: </label>
    <input type="number" id="burned" />
    <label for="consumed" class="consumed">Calories consumed: </label>
    <input type="number" id="consumed">
    <div class="add-food">
      <ul class="meal-list">
        <li class="meal-1">
          <label for="meal1" class="meal1">Meal <span class="meal-number">1</span></label>
          <input type="text" id="meal1">
        </li>
      </ul>
    </div>
    <input type="submit" class="save-edit" value="Save">
    <button type="button" class="go-back">Go Back</button>
  </form>
  <section role="region" class="meal-buttons">
    <button type="button" class="add-meal">Add meal</button>
  </section>
</section>`)
}

let l = 1;


function addMeal() {
  $('main').on('click', '.add-meal', function() {
    console.log('add meal button clicked');
    renderRemoveButton(l);
    addMealNumber();
    if(l<8) {
      $('.meal-list').append(`<li class="meal-${l}">
      <label for="meal${l}" class="meal${l}">Meal <span class="meal-number">${l}</span></label>
      <input type="text" id="meal${l}">
      </li>`);
      console.log(l);
    }
    else {
      console.log('max of 7 meals');
    }
  })
};

function renderRemoveButton(i) {
  console.log(l + 'from remove button');
  if(l===1) {
    $('.remove-meal').remove();
    $('.meal-buttons').append(`<button type="button" class="remove-meal">Remove meal</button>`)
  } 
};

function addMealNumber() {
  l+=1;
};

function removeMeal() {
  $('main').on('click', '.remove-meal', function() {
    console.log('hello from remove button');
    $('.meal-list').find(`.meal-${l}`).remove();
    removeMealNumber();
    iPositive();
  })
}

function removeMealNumber() {
  l-=1;
}

function iPositive() {
  if(l < 1) {
    l =0;
    console.log('keep i > ' + l);
  }
}

function saveEditForm(id) {
  console.log(id);
  $('main').on('submit', function(event) {
    event.preventDefault();
    console.log('hello im save submit button');
    const updateData = {};
    if($('#weight').val() !== "") {
      updateData.weight = $('#weight').val();
    }
    if($('#burned').val() !== "") {
      updateData.caloriesBurned = $('#burned').val();
    }
    if($('#consumed').val() !== "") {
      updateData.caloriesConsumed = $('#consumed').val();
    }
    updateData.meals = [];
    updateData.created = Date.now;
    updateData.id = id;

    for(let j=0; j < i; j++) {
      updateData.meals.push(
        $(`#meal${j+1}`).val(),
      );
    };
    const mealArray = updateData.meals.filter(meal => meal !== "");
    updateData.meals = mealArray;
    console.log(updateData);
    updateProgress(updateData);
  })
};

function updateProgress(updated) {
  fetch(`/api/track/${updated.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updated)
  })
  .then(res => {
    if(res.ok) {
      return res.json()
    }
    throw new Error(res.statusText);
  })
  .then(response => console.log('success: ' + response))
  .catch(err => console.log(err));
}

function dontEdit() {
  $('main').on('click', '.go-back', function() {
    $(location).attr('href', './progress-page.html');
  })
}

function runProgressPage() {
  getProgressData();
  editForm();
  dontEdit();
  //saveEditForm();
  addMeal();
  removeMeal();
  lastSevenDays();
  lastThirtyDays();
  allDays();
};

$(runProgressPage);
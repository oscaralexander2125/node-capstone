let token = localStorage.getItem("Bearer");
let findId;


function getData() {
  return fetch('/api/track', {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
}

function getProgressData() {
  //will be used to get data from api
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
  .then(responseJson => displayProgress(responseJson))
  .catch(err => {
    console.log(`Something went wrong: ${err.message}`);
    $(location).attr('href', '/index.html');
  });
}

//will need at add calories burned and consumed and meal to the real api
function displayProgress(data) {
  let date;
  let finalDate;
  $('.day').html('');
  let idValue;

  if(data.length===0) {
    console.log('nothing added yet');
  }
  else if (data.length <8) {
    for (let i = 0; i < data.length; i++) {
      date = new Date(data[i].date);
      finalDate = date.toLocaleDateString();
      $('.js-days').append(`<div class="col-3 add-days">
      <div class="day day-${i}">
        <p>Date: ${finalDate}<br /> Weight: ${data[i].weight} lbs<br /> Calories expended: ${data[i].caloriesBurned} kcal<br /> Caloric intake: ${data[i].caloriesConsumed} kcal<br />
      </div>
    </div>`);
      for (let j=0; j < data[i].meals.length; j++) {
        $(`.day-${i}`).append(`<p>Meal ${j+1}: ${data[i].meals[j]} <br />`);
      }
      idValue = data[i].id;
      $(`.day-${i}`).append(`<p class="edit-button"><button type="button" class="edit-form" onClick ="getIdValue(${i})">Edit</button>`);
      $(`.day-${i}`).append(`<p class="delete-button"><button type="button" class="delete-form" onClick = "findDayToDelete(${i})">Delete</button></p><br />`);
    }
  }
  else {
    for (let i = 0; i < 8; i++) {
      date = new Date(data[i].date);
      finalDate = date.toLocaleDateString();
      $('.js-days').append(`<div class="col-3 add-days">
      <div class="day day-${i}">
        <p>Date: ${finalDate}<br /> Weight: ${data[i].weight} lbs<br /> Calories expended: ${data[i].caloriesBurned} kcal<br /> Caloric intake: ${data[i].caloriesConsumed} kcal<br />
      </div>
    </div>`);
      for (let j=0; j < data[i].meals.length; j++) {
        $(`.day-${i}`).append(`<p>Meal ${j+1}: ${data[i].meals[j]} <br />`);
      }
      idValue = data[i].id;
      $(`.day-${i}`).append(`<p class="edit-button"><button type="button" class="edit-form" onClick ="getIdValue(${i})">Edit</button>`);
      $(`.day-${i}`).append(`<p class="delete-button"><button type="button" class="delete-form" onClick = "findDayToDelete(${i})">Delete</button></p><br />`);
    }
  }
};

function lastSevenDays() {
  console.log('seven days function wired');
  $('.7-days').on('click', function() {
    $('.js-days').html('');
    getProgressData();
  });
}


function lastThirtyDays() {
  $('.30-days').on('click', function() {
    console.log('30 day button');
    let date;
    let finalDate;
    getData()
    .then(data => {
      $('.js-days').html('');
      if(data.length < 30) {
        for (let k = 0; k < data.length; k++) {
          date = new Date(data[k].date);
          finalDate = date.toLocaleDateString();
          $('.js-days').append(`<div class="col-3 add-days">
          <div class="day day-${k}">
            <p>Date: ${finalDate}<br /> Weight: ${data[k].weight} lbs<br /> Calories expended: ${data[k].caloriesBurned} kcal<br /> Caloric intake: ${data[k].caloriesConsumed} kcal<br />
          </div>
        </div>`)
          for (let j=0; j < data[k].meals.length; j++) {
            $(`.day-${k}`).append(`<p>Meal ${j+1}: ${data[k].meals[j]} <br />`);
          }
          $(`.day-${k}`).append(`<p class="edit-button"><button type="button" class="edit-form" onClick ="getIdValue(${k})">Edit</button>`);
          $(`.day-${k}`).append(`<p class="delete-button"><button type="button" class="delete-form" onClick = "findDayToDelete(${k})">Delete</button></p><br />`);
        }
      } else {
        for (let k = 0; k < 30; k++) {
          date = new Date(data[k].date);
          finalDate = date.toLocaleDateString();
          $('.js-days').append(`<div class="col-3 add-days">
          <div class="day day-${k}">
            <p>Date: ${finalDate}<br /> Weight: ${data[k].weight} lbs<br /> Calories expended: ${data[k].caloriesBurned} kcal<br /> Caloric intake: ${data[k].caloriesConsumed} kcal<br />
          </div>
        </div>`)
          for (let j=0; j < data[k].meals.length; j++) {
            $(`.day-${k}`).append(`<p>Meal ${j+1}: ${data[k].meals[j]} <br />`);
          }
          $(`.day-${k}`).append(`<p class="edit-button"><button type="button" class="edit-form" onClick ="getIdValue(${k})">Edit</button>`);
          $(`.day-${k}`).append(`<p class="delete-button"><button type="button" class="delete-form" onClick = "findDayToDelete(${k})">Delete</button></p><br />`);
        }
      }
    })
    .catch(err => {
      displayHealthRecordError(`${err}`);
    });
  });
}

function allDays() {
  $('.all-days').on('click', function() {
    console.log('all day button');
    
    getData()
    .then(data => {
      $('.js-days').html('');
      for (let k = 0; k < data.length; k++) {
        date = new Date(data[k].date);
        finalDate = date.toLocaleDateString();
        $('.js-days').append(`<div class="col-3 add-days">
          <div class="day day-${k}">
            <p>Date: ${finalDate}<br /> Weight: ${data[k].weight} lbs<br /> Calories expended: ${data[k].caloriesBurned} kcal<br /> Caloric intake: ${data[k].caloriesConsumed} kcal<br />
          </div>
        </div>`)
          for (let j=0; j < data[k].meals.length; j++) {
            $(`.day-${k}`).append(`<p>Meal ${j+1}: ${data[k].meals[j]} <br />`);
          }
          $(`.day-${k}`).append(`<p class="edit-button"><button type="button" class="edit-form" onClick ="getIdValue(${k})">Edit</button>`);
          $(`.day-${k}`).append(`<p class="delete-button"><button type="button" class="delete-form" onClick = "findDayToDelete(${k})">Delete</button></p><br />`);
      }
    })
    .catch(err => {
      displayHealthRecordError(`${err}`);
    });
  });
}
function editForm() {
  //$('.js-days').on('click', '.edit-form', function() {
    //console.log(dayId);
    //$('header').hide();
    $('.buttons').hide();
    $('.display-progress').hide();
    //renderEditForm();
  //})
}

function renderEditForm(data) {
  editForm();
  const editData = [data];
  console.log(editData);

  for (let i = 0; i < editData.length; i++) {
    $('main').html(`<section role = "region" class = "edit-page">
    <div class="row">
      <div class="col-12">
        <div class="edit-section">
          <form class = "edit-form">
            <fieldset>Edit Day</fieldset><br />
            <div class="col-12 inputs-2">
              <label for = "weight">Weight: </label>
              <input type="number" id="weight" value = ${data.weight} />
              <label for="burned" class="burned">Caloried burned: </label>
              <input type="number" id="burned" value = ${data.caloriesBurned} />
            </div>
            <div class="col-12">
              <label for="consumed" class="consumed">Calories consumed: </label>
              <input type="number" id="consumed" value=${data.caloriesConsumed} />
            </div>
            <div class = "edit-error"></div>
              <div class="add-food">
                <ul class="meal-list">
                </ul>
              </div>
            <div class ="col-12 save-button">
              <input type="submit" class="save-edit" value="Save">
              <button type="button" class="go-back">Go Back</button>
            </div>
          </form>
          <section role="region" class="meal-buttons">
            <button type="button" class="add-meal">Add meal</button>
          </section>
        </div>
      </div>
    </div>
  </section>`)
    for (let k = 0; k< data.meals.length; k++) {
      $('.meal-list').append(`<li class ="meal-${k+1}">
        <label for ="meal${k+1}" class="meal${k+1}">Meal
        <span class = "meal-number">${k+1}</span>
        </label>
        <input type = "text" id="meal${k+1}" value = "${data.meals[k]}" />
      </li>`)
    }
  }
  if(data.meals.length>0) {
    $('.meal-buttons').append(`<button type="button" class="remove-meal">Remove meal</button>`)
  }
  l=data.meals.length;
  console.log(l);
}

let l;


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
    if(l>=8) {
      l=7;
    }
  })
};

function renderRemoveButton(i) {
  console.log(l + 'from remove button');
  if(l===0) {
    $('.remove-meal').remove();
    $('.meal-buttons').append(`<button type="button" class="remove-meal">Remove meal</button>`)
  } 
};

function addMealNumber() {
  if(l<8) {
    l+=1;
    console.log(l)
  }
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

function getIdValue(id) {
  getDayId(id)
  .then(responseJson => {
    return responseJson[id].id;
  })
  .then(editId => {
    saveEditForm(editId);//this is the id number for the item that is clicked
  })
  .catch(err => {
    $(location).attr('href', '/progress-page.html');
    displayHealthRecordError(err);
  });
}

function getDayId(id) {
  return fetch('/api/track', {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  })
}

function saveEditForm(id) {
  getIndividualItem(id);
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

    for(let j=0; j < l; j++) {
      updateData.meals.push(
        $(`#meal${j+1}`).val(),
      );
    };
    const mealArray = updateData.meals.filter(meal => meal !== "");
    updateData.meals = mealArray;
    updateData.id = id;
    console.log(updateData);
    updateProgress(updateData);
  })
};

function updateProgress(updated) {
  console.log(updated)
  fetch(`/api/track/${updated.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(updated)
  })
  .then(res => {
    if(res.ok) {
      return res.json()
    }
    throw new Error(res.statusText);
  })
  .then(response => {
    $(location).attr('href', '/progress-page.html')
  })
  .catch(err => {
    displayEditFormError(err);
    //display something on screen if PUT has error
  });
}

function getIndividualItem(id) {
  return fetch(`/api/track/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  .then(res => {
    if(res.ok) {
      return res.json()
    }
    throw new Error(res.statusText);
  })
  .then(responseJson => {
    renderEditForm(responseJson);
  })
}

function dontEdit() {
  $('main').on('click', '.go-back', function() {
    $(location).attr('href', './progress-page.html');
  })
}

function findDayToDelete(id) {
  getDayId()
  .then(responseJson => {
    return responseJson[id].id;
  })
  .then(deleteItem => {
    deleteDay(deleteItem);
    console.log(deleteItem)
  })
  .catch(err => {
    displayHealthRecordError(err);
  });
}

function deleteDay(itemId) {
  fetch(`/api/track/${itemId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    },
  })
  .then(res => {
    if(res.ok) {
      return getProgressData();
    }
    throw new Error(res.statusText)
  })
  .catch(err => displayHealthRecordError(err));
}

function displayHealthRecordError(error) {
  $('.error-display').html('');
  $('.error-display').html(`<p>Oops! ${error.message}`);
}

function displayEditFormError(error) {
  $('.edit-error').html('');
  $('.edit-error').html(`<p>Oops! ${error.message}`);
}

function runProgressPage() {
  getProgressData();
  //editForm();
  dontEdit();
  //saveEditForm();
  addMeal();
  removeMeal();
  lastSevenDays();
  lastThirtyDays();
  allDays();
};

$(runProgressPage);
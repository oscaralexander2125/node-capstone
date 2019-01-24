const progressDays = [
  {
    weight: 10,
    calories: 2000,
    meal:['chicken and rice','eggs and oatmeal'],
    date: new Date()
  },
  {
    weight: 30,
    calories: 3000,
    meal:['potatoes and salmon'],
    date: new Date()
  },
  {
    weight: 50,
    calories: 2500,
    meal:['potatoes and beans','eggs and oatmeal'],
    date: new Date()
  },
  {
    weight: 10,
    calories: 2000,
    meal:['chicken and rice'],
    date: new Date()
  },
  {
    weight: 30,
    calories: 3000,
    meal:['potatoes and salmon','eggs and oatmeal'],
    date: new Date()
  },
  {
    weight: 50,
    calories: 2500,
    meal:['potatoes and beans'],
    date: new Date()
  },
  {
    weight: 10,
    calories: 2000,
    meal:['chicken and rice'],
    date: new Date()
  },
  {
    weight: 30,
    calories: 3000,
    meal:['potatoes and salmon'],
    date: new Date()
  },
  {
    weight: 50,
    calories: 2500,
    meal:['potatoes and beans'],
    date: new Date()
  },
  {
    weight: 10,
    calories: 2000,
    meal:['chicken and rice'],
    date: new Date()
  },
  {
    weight: 30,
    calories: 3000,
    meal:['potatoes and salmon'],
    date: new Date()
  },
  {
    weight: 50,
    calories: 2500,
    meal:['potatoes and beans'],
    date: new Date()
  },
  {
    weight: 10,
    calories: 2000,
    meal:['chicken and rice'],
    date: new Date()
  },
  {
    weight: 30,
    calories: 3000,
    meal:['potatoes and salmon'],
    date: new Date()
  },
  {
    weight: 50,
    calories: 2500,
    meal:['potatoes and beans'],
    date: new Date()
  },
  {
    weight: 10,
    calories: 2000,
    meal:['chicken and rice', 'eggs and oatmeal'],
    date: new Date()
  },
  {
    weight: 30,
    calories: 3000,
    meal:['potatoes and salmon','eggs and oatmeal'],
    date: new Date()
  },
  {
    weight: 50,
    calories: 2500,
    meal:['potatoes and beans'],
    date: new Date()
  },
  {
    weight: 10,
    calories: 2000,
    meal:['chicken and rice','eggs and oatmeal'],
    date: new Date()
  },
  {
    weight: 30,
    calories: 3000,
    meal:['potatoes and salmon','eggs and oatmeal'],
    date: new Date()
  },
  {
    weight: 50,
    calories: 2500,
    meal:['potatoes and beans'],
    date: new Date()
  },
  {
    weight: 10,
    calories: 2000,
    meal:['chicken and rice'],
    date: new Date()
  },
  {
    weight: 30,
    calories: 3000,
    meal:['potatoes and salmon'],
    date: new Date()
  },
  {
    weight: 50,
    calories: 2500,
    meal:['potatoes and beans'],
    date: new Date()
  },
  {
    weight: 10,
    calories: 2000,
    meal:['chicken and rice'],
    date: new Date()
  },
  {
    weight: 30,
    calories: 3000,
    meal:['potatoes and salmon'],
    date: new Date()
  },
  {
    weight: 50,
    calories: 2500,
    meal:['potatoes and beans'],
    date: new Date()
  },
  {
    weight: 10,
    calories: 2000,
    meal:['chicken and rice'],
    date: new Date()
  },
  {
    weight: 30,
    calories: 3000,
    meal:['potatoes and salmon','eggs and oatmeal'],
    date: new Date()
  },
  {
    weight: 50,
    calories: 2500,
    meal:['potatoes and beans'],
    date: new Date()
  },
  {
    weight: 10,
    calories: 2000,
    meal:['chicken and rice'],
    date: new Date()
  },
  {
    weight: 30,
    calories: 3000,
    meal:['potatoes and salmon','eggs and oatmeal'],
    date: new Date()
  },
  {
    weight: 50,
    calories: 2500,
    meal:['potatoes and beans'],
    date: new Date()
  },
  {
    weight: 10,
    calories: 2000,
    meal:['chicken and rice'],
    date: new Date()
  },
  {
    weight: 30,
    calories: 3000,
    meal:['potatoes and salmon'],
    date: new Date()
  },
  {
    weight: 50,
    calories: 2500,
    meal:['potatoes and beans'],
    date: new Date()
  },
];

function sortDays() {
  progressDays.sort(function(a,b) {
    b.date - a.date;
  })
}

function getProgressData() {
  //will be used to get data from api
}

//will need at add calories burned and consumed and meal to the real api
function displayProgress() {
  for (let i = 0; i < progressDays.length; i++) {
    $('.display-progress').append(`<div class="row">
      <div class="col-3">
        <div class="day">${progressDays[i].weight} ${progressDays[i].calories} ${progressDays[i].meal} ${progressDays[i].date} </div>
      </div>
    </div>`)
  }
}

function lastSevenDays() {
  console.log('seven days function wired');
  $('.7-days').on('click', function() {
    console.log('7 days button clicked');
    $('.display-progress').html('');
    for (let j = 0; j < 7; j++) {
      $('.display-progress').append(`<div class="row">
        <div class="col-3">
          <div class="day">${progressDays[j].weight} ${progressDays[j].calories} ${progressDays[j].meal} ${progressDays[j].date} </div>
        </div>
      </div>`)
    }
  });
}

function lastThirtyDays() {
  $('.30-days').on('click', function() {
    $('.display-progress').html('');
    for (let k = 0; k < 30; k++) {
      $('.display-progress').append(`<div class="row">
        <div class="col-3">
          <div class="day">${progressDays[k].weight} ${progressDays[k].calories} ${progressDays[k].meal} ${progressDays[k].date} </div>
        </div>
      </div>`)
    }
  });
}

function allDays() {
  $('.all-days').on('click', function() {
    $('.display-progress').html('');
    displayProgress();
  });
}

function runProgressPage() {
  displayProgress();
  lastSevenDays();
  lastThirtyDays();
  allDays();
  sortDays();
};

$(runProgressPage);
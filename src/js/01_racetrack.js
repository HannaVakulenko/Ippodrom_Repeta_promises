const horses = [
  'Secretariat',
  'Eclipse',
  'West Australian',
  'Flying Fox',
  'Seabiscuit',
];

let raceCounter = 0;

const refs = {
  startBtn: document.querySelector('.js-start-race'),
  winnerField: document.querySelector('.js-winner'),
  progressField: document.querySelector('.js-progress'),
  tableBody: document.querySelector('.js-results-table > tbody'),
};

refs.startBtn.addEventListener('click', onStart);

function onStart() {
  raceCounter += 1;
  const promises = horses.map(run);

  updateWinnerField(''); // очищаем имя победителя
  updateProgressField('The Race has started, bids are not accepted!');
  determineWinner(promises);
  waitForAll(promises);
}

//horsesP - це промиси

function determineWinner(horsesP) {
  Promise.race(horsesP).then(({ horse, time }) => {
    updateWinnerField(`${horse} is a winner, the finished time is ${time}`);
    updateResultTable({ raceCounter, horse, time });
  });
}

function waitForAll(horsesP) {
  Promise.all(horsesP).then(({ horse, time }) => {
    updateProgressField('The Race is over, bids are accepted!');
  });
}

function updateWinnerField(message) {
  refs.winnerField.textContent = message;
}

function updateProgressField(message) {
  refs.progressField.textContent = message;
}

function updateResultTable({ raceCounter, horse, time }) {
  const tr = `<tr><td>${raceCounter}</td><td>${horse}</td><td>${time}</td></tr>`;
  refs.tableBody.insertAdjacentHTML('beforeend', tr);
}

function getRandomTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function run(horse) {
  return new Promise(resolve => {
    const time = getRandomTime(2000, 3500);

    setTimeout(() => {
      resolve({ horse, time });
    }, time);
  });
}

//console.log(promises);

// Promise.race(promises).then(({ horse, time }) => {
//   console.log(`${horse} is a winner, the finished time is ${time}`);
// });

// Promise.all(promises).then(({ horse, time }) => {
//   console.log('Check-in is over, bids are accepted.');
// });

//run('Mango').then(x => console.log(x));

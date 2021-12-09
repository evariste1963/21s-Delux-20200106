'use strict';
//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //this is slightly quicker for id #
const winner0El = document.querySelector('.winner0');
const winner1El = document.querySelector('.winner1');
const trophy0El = document.querySelector('.trophy0');
const trophy1El = document.querySelector('.trophy1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const messageDetails = document.querySelector('.message');
const cardEl = document.querySelector('.card');
const btnNew = document.querySelector('.btn--new');
const btnAck = document.querySelector('.btn--ack');
const btnCancel = document.querySelector('.btn--cancel');
const btnTwist = document.querySelector('.btn--twist');
const btnStick = document.querySelector('.btn--stick');
const btnAceP1 = document.querySelector('.btn--aceP1');
const btnAceP2 = document.querySelector('.btn--aceP2');
const card1 = document.querySelector('.card1');
const card2 = document.querySelector('.card2');
const card3 = document.querySelector('.card3');
const card4 = document.querySelector('.card4');
const card5 = document.querySelector('.card5');
const card6 = document.querySelector('.card6');
const card7 = document.querySelector('.card7');
const card8 = document.querySelector('.card8');
const card9 = document.querySelector('.card9');
const card10 = document.querySelector('.card10');
const card11 = document.querySelector('.card11');
const card12 = document.querySelector('.card12');
const card13 = document.querySelector('.card13');
const card14 = document.querySelector('.card14');
const card15 = document.querySelector('.card15');
const card16 = document.querySelector('.card16');

let image_arr = [
  '02C.png',
  '02D.png',
  '02H.png',
  '02S.png',
  '03C.png',
  '03D.png',
  '03H.png',
  '03S.png',
  '04C.png',
  '04D.png',
  '04H.png',
  '04S.png',
  '05C.png',
  '05D.png',
  '05H.png',
  '05S.png',
  '06C.png',
  '06D.png',
  '06H.png',
  '06S.png',
  '07C.png',
  '07D.png',
  '07H.png',
  '07S.png',
  '08C.png',
  '08D.png',
  '08H.png',
  '08S.png',
  '09C.png',
  '09D.png',
  '09H.png',
  '09S.png',
  '10C.png',
  '10D.png',
  '10H.png',
  '10S.png',
  '10JC.png',
  '10JD.png',
  '10JH.png',
  '10JS.png',
  '10QC.png',
  '10QD.png',
  '10QH.png',
  '10QS.png',
  '10KC.png',
  '10KD.png',
  '10KH.png',
  '10KS.png',
  '01AC.png',
  '01AD.png',
  '01AH.png',
  '01AS.png',
];
let shuffledPack = image_arr;
console.log(shuffledPack);
console.log(card12);
let scores,
  img,
  sticks,
  currentScore,
  activePlayer,
  playing,
  winner,
  bust,
  ace1BtnPress = 0,
  ace2BtnPress = 0;
scores = [0, 0];
sticks = [0, 0];
let cardsPlayer0 = [];
let cardsPlayer1 = [];
let cardsPlayer = [cardsPlayer0, cardsPlayer1];
let aceBtnPress = [ace1BtnPress, ace2BtnPress];
let btnAce = [btnAceP1, btnAceP2];
let busts = [0, 0];
let busted;

//initial conditions
const init = function () {
  aceBtnPress = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  winner0El.classList.add('hidden');
  winner1El.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--winner', 'player--active');
  shuffledPack = shuffledPack.concat(cardsPlayer0, cardsPlayer1);
  cardsPlayer0.length = 0;
  cardsPlayer1.length = 0;
  cardEl.src = `cards/cardBack.jpg`;
  btnAceP1.classList.add('hidden');
  btnAceP2.classList.add('hidden');
  btnTwist.classList.remove('hidden');
  btnStick.classList.remove('hidden');
  cardEl.classList.remove('hidden');
  messageDetails.classList.add('hidden');
  document.getElementById(`current--0`).style.color = '#fff';
  document.getElementById(`current--1`).style.color = '#fff';
  busts = [0, 0];
  reinstateStars();
  addCurrent();
  removeTrophy();
  shuffleCards();
};
init();

const roundInit = function () {
  shuffledPack = shuffledPack.concat(cardsPlayer0, cardsPlayer1);

  const hideDrawnCards1 = function () {
    let hideCards1 = document.getElementsByClassName('cards');

    for (const x of hideCards1) x.classList.add('hidden'); //works like 'FOR' below

    // for (let i = 0; i < cardsPlayer0.length; i++) {
    //   hideCards1[i].classList.add('hidden');
    // }
  };

  const hideDrawnCards2 = function () {
    let hideCards2 = document.getElementsByClassName('cards1');

    for (const x of hideCards2) x.classList.add('hidden'); //works like 'FOR' below

    // for (let i = 0; i < cardsPlayer1.length; i++) {
    //   hideCards2[i].classList.add('hidden');
    // }
  };

  function emptyCardsPlayed() {
    cardsPlayer0.length = 0;
    cardsPlayer1.length = 0;
  }
  hideDrawnCards1();
  hideDrawnCards2();
  emptyCardsPlayed();

  aceBtnPress = [0, 0];
  btnAceP1.classList.add('hidden');
  btnAceP2.classList.add('hidden');
  btnAceP1.textContent = '👇🏼 ACE 1';
  btnAceP2.textContent = '👇🏼 ACE 1';
  shuffleCards();
};

//SWITCH PLAYER FUNCTION
const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  document.querySelector('.btn--twist').textContent = '🃏 DEAL';
};
const calcScore = function () {
  if (currentScore <= 21) {
    //add cards to current score
    document.getElementById(
      `current--${activePlayer}`
    ).textContent = currentScore;
  } else {
    document.getElementById(`current--${activePlayer}`).textContent = 'BUST!';
    document.getElementById(`current--${activePlayer}`).style.color = 'red';
    busts[activePlayer] += 1;
    removeStars();
    sticks[activePlayer] = 1;
    cardEl.src = `cards/cardBack.jpg`;
    switchPlayer();
  }

  if (
    //player 1 BUST only
    current0El.textContent === 'BUST!' &&
    current1El.textContent !== 'BUST!'
  ) {
    bust = 1;
    if (activePlayer !== 1) {
      btnTwist.textContent = '🃏 DEAL';
    }
  } else if (
    //player 2 BUST only
    current1El.textContent === 'BUST!' &&
    current0El.textContent !== 'BUST!' &&
    activePlayer === 0
  ) {
    bust = 2;
  } else if (
    //Both players BUST
    current1El.textContent === 'BUST!' &&
    current0El.textContent === 'BUST!'
  ) {
    bust = 3;
  } else bust = 0;
};

//get and display dealt card
const getCard = () => {
  function getImage(shuffledPack, path) {
    path = path || 'cards/';
    let num = 0; //draw from top of the original shuffled pack each time
    img = shuffledPack[num];

    cardEl.src = `cards/${img}`;

    currentScore += Number(img.substring(0, 2));

    if (activePlayer === 0) {
      cardsPlayer0.push(`${img}`);
      shuffledPack.splice(num, 1);
    } else if (activePlayer === 1) {
      cardsPlayer1.push(`${img}`);
      shuffledPack.splice(num, 1);
    }
  }
  getImage(shuffledPack);
  // display card
  cardEl.classList.remove('hidden');
};

//Shuffle the cards -----
// pack is shuffled between each round
//card is drawn from top of pack each draw
function shuffleCards() {
  var i, j, k;
  for (i = image_arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * i);
    k = shuffledPack[i];
    shuffledPack[i] = shuffledPack[j];
    shuffledPack[j] = k;
  }
}

//FUNCTION display drawn cards for player 1
const displayDrawnCards = function () {
  let dealtCards = [0, 0];
  activePlayer === 0
    ? (dealtCards = document.getElementsByClassName('cards'))
    : (dealtCards = document.getElementsByClassName('cards1')); //same as IF and Tenary Op below --- but this is the better option in this instance

  //OR
  // if (activePlayer === 0){
  //   dealtCards = document.getElementsByClassName('cards')
  // } else dealtCards = dealtCards = document.getElementsByClassName('cards1');

  //OR even
  // activePlayer === 0 && (dealtCards = document.getElementsByClassName('cards'));
  // activePlayer === 1 && (dealtCards = document.getElementsByClassName('cards1'));

  // display cards played
  // for (let i = 0; i < cardsPlayer[activePlayer].length; i++) {
  // dealtCards[i].classList.remove('hidden');

  ////same as above using forEach Method on array --- function(value, index, array)
  cardsPlayer[activePlayer].forEach(function (e, i) {
    dealtCards[i].classList.remove('hidden');
    //console.log(e);

    card1.src = `cards/${cardsPlayer0[0]}`;
    card2.src = `cards/${cardsPlayer0[1]}`;
    card3.src = `cards/${cardsPlayer0[2]}`;
    card4.src = `cards/${cardsPlayer0[3]}`;
    card5.src = `cards/${cardsPlayer0[4]}`;
    card6.src = `cards/${cardsPlayer0[5]}`;
    card7.src = `cards/${cardsPlayer0[6]}`;
    card8.src = `cards/${cardsPlayer0[7]}`;

    card9.src = `cards/${cardsPlayer1[0]}`;
    card10.src = `cards/${cardsPlayer1[1]}`;
    card11.src = `cards/${cardsPlayer1[2]}`;
    card12.src = `cards/${cardsPlayer1[3]}`;
    card13.src = `cards/${cardsPlayer1[4]}`;
    card14.src = `cards/${cardsPlayer1[5]}`;
    card15.src = `cards/${cardsPlayer1[6]}`;
    card16.src = `cards/${cardsPlayer1[7]}`;

    if (
      (cardsPlayer[activePlayer].includes('01AC.png') ||
        cardsPlayer[activePlayer].includes('01AD.png') ||
        cardsPlayer[activePlayer].includes('01AH.png') ||
        cardsPlayer[activePlayer].includes('01AS.png')) &&
      currentScore + 10 <= 21 &&
      aceBtnPress[activePlayer] === 0
    ) {
      btnAce[activePlayer].classList.remove('hidden');
      btnAce[activePlayer].textContent = '👇🏼 ACE 1';
      aceBtnPress[activePlayer] = 0;
    }
  });
};

const checkScore = function () {
  if (
    (cardsPlayer[activePlayer].includes('01AC.png') ||
      cardsPlayer[activePlayer].includes('01AD.png') ||
      cardsPlayer[activePlayer].includes('01AH.png') ||
      cardsPlayer[activePlayer].includes('01AS.png')) &&
    aceBtnPress[activePlayer] === 1
  ) {
    currentScore -= 10;
    document.getElementById(
      `current--${activePlayer}`
    ).textContent = currentScore;
    btnAce[activePlayer].textContent = '👇🏼 ACE 1';
    aceBtnPress[activePlayer] = 0;
  }
};

//REMOVE STAR FROM CURRENT PLAYER ON BUST
const removeStars = function () {
  //if (activePlayer === 0) {
  //busted = document.getElementsByClassName('star0');
  //} else {
  //busted = document.getElementsByClassName('star1');
  // }
  //this can replace IF statement above
  activePlayer === 0
    ? (busted = document.getElementsByClassName('star0'))
    : (busted = document.getElementsByClassName('star1'));

  for (let i = 0; i < busts[activePlayer]; i++) {
    busted[i].classList.add('hidden');
  }

  // --- replacing IF statements --- and alternatives --- //
  //if (busts[0] === 2) document.getElementById('busts0').style.color = 'orange'; // single line if statement
  busts[0] === 2 && (document.getElementById('busts0').style.color = 'orange'); // this also works
  //{
  //  document.getElementById('busts0').style.color = 'orange';
  // }
  //if (busts[0] > 3) document.getElementById('busts0').style.color = 'red'; // single line if statement
  busts[0] > 3 && (document.getElementById('busts0').style.color = 'red'); // this also works
  //{
  //document.getElementById('busts0').style.color = 'red';
  // }
  //if (busts[1] === 2) document.getElementById('busts1').style.color = 'orange'; // single line if statement
  busts[1] === 2 && (document.getElementById('busts1').style.color = 'orange'); // this also works
  //{
  // document.getElementById('busts1').style.color = 'orange';
  //}
  //if (busts[1] > 3) document.getElementById('busts1').style.color = 'red'; // single line if statement
  busts[1] > 3 && (document.getElementById('busts1').style.color = 'red'); // this also works
  //{
  //  document.getElementById('busts1').style.color = 'red';
  // }
};

function reinstateStars() {
  let eachStar = document.getElementsByClassName('star');

  for (const star of eachStar) star.classList.remove('hidden'); //works like 'FOR' below

  // for (let i = 0; i < eachStar.length; i++) {
  //   eachStar[i].classList.remove('hidden');
  // }

  document.getElementById('busts0').style.color = 'rgb(24, 80, 24)';
  document.getElementById('busts1').style.color = 'rgb(24, 80, 24)';
  document.getElementById('busts0').textContent = 'BUSTS:';
  document.getElementById('busts1').textContent = 'BUSTS:';
}

////FUNCTION  toggle ace card for active player  between 1 and 11 when allowed
const toggleAce = function () {
  if (
    (cardsPlayer[activePlayer].includes('01AC.png') ||
      cardsPlayer[activePlayer].includes('01AD.png') ||
      cardsPlayer[activePlayer].includes('01AH.png') ||
      cardsPlayer[activePlayer].includes('01AS.png')) &&
    aceBtnPress[activePlayer] === 0
  ) {
    if (currentScore + 10 > 21) {
      btnAce[activePlayer].classList.add('hidden');
      aceBtnPress[activePlayer] = 0;
      btnAce[activePlayer].textContent = 'ACE 1';
    } else {
      currentScore += 10;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      btnAce[activePlayer].textContent = '☝🏼 ACE 11';
      aceBtnPress[activePlayer] = 1;
    }
  } else checkScore();
};

//FUNCTION calculate round winner
const roundWinner = function () {
  let roundWon =
    Number(current0El.textContent) > Number(current1El.textContent) ? 0 : 1;
  scores[roundWon]++;
  winner =
    roundWon === 0
      ? winner0El.classList.remove('hidden')
      : winner1El.classList.remove('hidden');
  document.getElementById(`score--${roundWon}`).textContent = scores[roundWon];
  btnAceP1.classList.add('hidden');
  btnAceP2.classList.add('hidden');
};

//FUNCTION CALCULATE WINNER FUNCTION
const calcWinner = function () {
  if (busts[0] > 4) {
    document.getElementById('busts0').textContent = 'BUSTED!!';
    champion();
  }
  if (busts[1] > 4) {
    document.getElementById('busts1').textContent = 'BUSTED!!';
    champion();
  }
  if (busts[0] === 5 && busts[1] === 5) {
    roundInit();
    playing = false;
    btnTwist.classList.add('hidden');
    btnStick.classList.add('hidden');
    messageDetails.classList.add('hidden');
    sticks = [0, 0];
    return;
  } else if (sticks[0] === 1 && sticks[1] === 1) {
    if (current0El.textContent === current1El.textContent) {
      if (bust === 3) {
        // switchPlayer();
        sticks = [0, 0];
        document.querySelector('.btn--twist').textContent = '🃏 DEAL';
        bust = 0;
        cardEl.src = 'cards/cardBack.jpg';
        if (busts[1] < 5) {
          messageDetails.classList.remove('hidden');
          messageDetails.textContent = `👉  BUST!  👈`;
        }

        messageDetails.style.backgroundColor = 'red';
        cardEl.classList.add('hidden');
        roundInit();
      } else {
        //score draw
        sticks = [0, 0];
        resetScores();
        cardEl.src = 'cards/cardBack.jpg';
        messageDetails.style.backgroundColor = 'green';
        messageDetails.classList.remove('hidden');
        messageDetails.textContent = `💚  DRAW !  💚`;
        cardEl.classList.add('hidden');
      }
    } else {
      //INSTANCE OF NO DRAW
      //player 1 busts only
      if (bust === 1) {
        scores[1]++;
        score1El.textContent = scores[1];
        sticks = [0, 0];
        currentScore = 0;
        bust = 0;
        winner1El.classList.remove('hidden');
        resetScores();
        cardEl.src = 'cards/cardBack.jpg';
        //player 2 busts only
      } else if (bust === 2) {
        scores[0]++;
        score0El.textContent = scores[0];
        sticks = [0, 0];
        currentScore = 0;
        bust = 0;
        winner0El.classList.remove('hidden');
        resetScores();
        cardEl.src = 'cards/cardBack.jpg';
      } else roundWinner();
      champion();
      sticks = [0, 0];
      currentScore = 0;
      bust = 0;
      resetScores();
      cardEl.src = 'cards/cardBack.jpg';
    }
  }
};
//FUNCTION check that the TOTAL score is 21 -- 1st player to win 21 games wins
const champion = function () {
  if (
    (scores[0] > scores[1] && scores[0] >= 21) ||
    (busts[1] > 4 && scores[0] > 0)
  ) {
    //end game
    playing = false;
    cardEl.classList.add('hidden');
    player0El.classList.add('player--winner');
    trophy0El.classList.remove('hidden');
    winner0El.classList.remove('hidden');
    removeCurrent();
    player0El.classList.remove('player--active');
    btnTwist.classList.add('hidden');
    btnStick.classList.add('hidden');
    //roundInit();
    messageDetails.classList.add('hidden');
  } else if (
    (scores[1] > scores[0] && scores[1] >= 21) ||
    (busts[0] > 4 && scores[1] > 0)
  ) {
    playing = false;
    cardEl.classList.add('hidden');
    player1El.classList.add('player--winner');
    trophy1El.classList.remove('hidden');
    winner1El.classList.remove('hidden');
    removeCurrent();
    player1El.classList.remove('player--active');
    btnTwist.classList.add('hidden');
    btnStick.classList.add('hidden');

    //roundInit();
    messageDetails.classList.add('hidden');
  }
};
//FUNCTION hide current score boxes
function removeCurrent() {
  const x = document.querySelectorAll('.current'); // can use VAR to ensure that x is not available outside this function block
  for (let i = 0; i < x.length; i++) {
    x[i].classList.add('hidden');
  }
}
//FUNCTION display current score boxes
function addCurrent() {
  const x = document.querySelectorAll('.current'); // can use VAR to ensure that x is not available outside this function block
  for (let i = 0; i < x.length; i++) {
    x[i].classList.remove('hidden');
  }
}
//FUNCTION remove Trophy icon
function removeTrophy() {
  trophy0El.classList.add('hidden');
  trophy1El.classList.add('hidden');
}
//FUNCTION reset scores at end of round
const resetScores = function () {
  current0El.textContent = 0;
  current1El.textContent = 0;
  roundInit();
};

//FUNCTION card functionality on twist button press
btnTwist.addEventListener('click', function () {
  messageDetails.classList.add('hidden');

  if (
    playing &&
    current0El.textContent === 'BUST!' &&
    current1El.textContent === 'BUST!'
  ) {
    resetScores();
  }
  if (playing && this.textContent === '🃏 DEAL') {
    this.textContent = '🃏 twist';
    winner0El.classList.add('hidden');
    winner1El.classList.add('hidden');

    if (bust === 0) {
      cardEl.src = `cards/cardBack.jpg`;
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      document.getElementById(`current--0`).style.color = '#fff';
      document.getElementById(`current--1`).style.color = '#fff';
    }
  }
  //MAIN GAME sequencing
  if (playing) {
    getCard();
    // if (currentScore > 21) { checkScore() };
    //currentScore > 21 && checkScore(); //short circuit -- same as above
    currentScore < 22 || checkScore();
    displayDrawnCards();
    calcScore();
    // if (bust > 0) {calcWinner()}
    bust > 0 && calcWinner(); //short circuit --- same as above
    //bust < 1 || calcWinner(); // this would work too as above
  }
});
//on stick button press (current score > 16 ---- clacut=late winner and switch player
btnStick.addEventListener('click', function () {
  if (playing) {
    if (currentScore >= 16) {
      sticks[activePlayer] = 1; ///updates array with TURNOVER
      cardEl.src = `cards/cardBack.jpg`;
      calcWinner();
      switchPlayer();
    }
  }
});
// CALL toggle ACE buttons
btnAceP1.addEventListener('click', toggleAce);

btnAceP2.addEventListener('click', toggleAce);

if (btnTwist.textContent === '🃏 deal' && sticks[0] === 0 && sticks[1] === 0) {
  resetScores();
}
//FUNCTION New game selection
btnNew.addEventListener('click', function () {
  if (this.textContent === '🔄 New Game') {
    if (
      scores[0] !== 0 ||
      scores[1] !== 0 ||
      busts[0] === 5 ||
      busts[1] === 5
    ) {
      this.classList.add('boldText');
      this.textContent = '🤔⁉ ARE YOU SURE?';
      btnCancel.classList.remove('hidden');
      btnAck.classList.remove('hidden');
    }
  }
});

// Cancel button (btn--new) press by clicking anywhere except btn--new.
document.addEventListener('click', function (e) {
  const isClickInsideElement = btnNew.contains(e.target);
  if (!isClickInsideElement) {
    newGameCancel();
  }
});

//FUNCTION show buttons for new game decision
const newGameCancel = function () {
  btnNew.classList.remove('boldText');
  btnNew.textContent = '🔄 New Game';
  btnCancel.classList.add('hidden');
  btnAck.classList.add('hidden');
};
//FUNCTION  wipe all scores and start new game  -- CALL functions
btnAck.addEventListener('click', function () {
  newGameCancel();
  roundInit();
  init();
});
//cancel new game button and continue where left off --- using higher order function (adevent...) and callback function (newGa...)
btnCancel.addEventListener('click', newGameCancel); //{
//newGameCancel();
//});

//Theme selection --- Pink or Blue
document.addEventListener('DOMContentLoaded', function () {
  var checkbox = document.querySelector('input[type="checkbox"]');

  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      document.querySelector('body').style.backgroundColor = '#ca29ca';
      document.querySelectorAll('.score');

      const TextColorP = function () {
        let allscore = document.getElementsByClassName('score');
        for (const x of allscore) x.style.color = '#911491';

        // for (let i = 0; i < allscore.length; i++) {
        //   allscore[i].style.color = '#911491';
        // }
      };
      const changeBgColorP = function () {
        let allCurrent = document.getElementsByClassName('current');
        for (const x of allCurrent) x.style.backgroundColor = '#911491';

        // for (let i = 0; i < allCurrent.length; i++) {
        //   allCurrent[i].style.backgroundColor = '#911491';
        // }
      };
      changeBgColorP();
      TextColorP();
    } else {
      document.querySelector('body').style.backgroundColor = '#4c4ae4';
      const TextColorB = function () {
        let allscore = document.getElementsByClassName('score');
        for (const x of allscore) x.style.color = '#302ec9';

        // for (let i = 0; i < allscore.length; i++) {
        //   allscore[i].style.color = '#302ec9';
        // }
      };
      const changeBgColorB = function () {
        let allCurrent = document.getElementsByClassName('current');
        for (const x of allCurrent) x.style.backgroundColor = '#302ec9';

        // for (let i = 0; i < allCurrent.length; i++) {
        //   allCurrent[i].style.backgroundColor = '#302ec9';
        // }
      };
      changeBgColorB();
      TextColorB();
    }
  });
});

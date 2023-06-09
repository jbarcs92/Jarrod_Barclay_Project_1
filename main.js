const CARDS = {
1: {img: 'cards/A-C.png', value: 1},
2: {img: 'cards/A-D.png', value: 1},
3: {img: 'cards/A-H.png', value: 1},
4: {img: 'cards/A-S.png', value: 1},
5: {img: 'cards/2-C.png', value: 2},
6: {img: 'cards/2-D.png', value: 2},
7: {img: 'cards/2-H.png', value: 2},
8: {img: 'cards/2-S.png', value: 2},
9: {img: 'cards/3-C.png', value: 3},
10: {img: 'cards/3-D.png', value: 3},
11: {img: 'cards/3-H.png', value: 3},
12: {img: 'cards/3-S.png', value: 3},
13: {img: 'cards/4-C.png', value: 4},
14: {img: 'cards/4-D.png', value: 4},
15: {img: 'cards/4-H.png', value: 4},
16: {img: 'cards/4-S.png', value: 4},
17: {img: 'cards/5-C.png', value: 5},
18: {img: 'cards/5-D.png', value: 5},
19: {img: 'cards/5-H.png', value: 5},
20: {img: 'cards/5-S.png', value: 5},
21: {img: 'cards/6-C.png', value: 6},
22: {img: 'cards/6-D.png', value: 6},
23: {img: 'cards/6-H.png', value: 6},
24: {img: 'cards/6-S.png', value: 6},
25: {img: 'cards/7-C.png', value: 7},
26: {img: 'cards/7-D.png', value: 7},
27: {img: 'cards/7-H.png', value: 7},
28: {img: 'cards/7-S.png', value: 7},
29: {img: 'cards/8-C.png', value: 8},
30: {img: 'cards/8-D.png', value: 8},
31: {img: 'cards/8-H.png', value: 8},
32: {img: 'cards/8-S.png', value: 8},
33: {img: 'cards/9-C.png', value: 9},
34: {img: 'cards/9-D.png', value: 9},
35: {img: 'cards/9-H.png', value: 9},
36: {img: 'cards/9-S.png', value: 9},
37: {img: 'cards/10-C.png', value: 10},
38: {img: 'cards/10-D.png', value: 10},
39: {img: 'cards/10-H.png', value: 10},
40: {img: 'cards/10-S.png', value: 10},
41: {img: 'cards/J-C.png', value: 10},
42: {img: 'cards/J-D.png', value: 10},
43: {img: 'cards/J-H.png', value: 10},
44: {img: 'cards/J-S.png', value: 10},
45: {img: 'cards/Q-C.png', value: 10},
46: {img: 'cards/Q-D.png', value: 10},
47: {img: 'cards/Q-H.png', value: 10},
48: {img: 'cards/Q-S.png', value: 10},
49: {img: 'cards/K-C.png', value: 10},
50: {img: 'cards/K-D.png', value: 10},
51: {img: 'cards/K-H.png', value: 10},
52: {img: 'cards/K-S.png', value: 10},
};

const BACKCARD = 'cards/BACK.png';

const CHIPS = [1, 5, 10, 50, 100];

let cash = 500;
let wager;
let totalp;
let totald;
let resultsP;
let resultsD;
let pCard1;
let pCard2;
let pCard3;
let pCard4;
let pCard5;
let pCard6;
let pCard7;
let dCard1;
let dCard2;
let dCard3;
let dCard4;
let dCard5;
let dCard6;
let dCard7;

const newBetBtn = document.getElementById('newBet');
const dealBtn = document.getElementById('deal');
const standBtn = document.getElementById('stand');
const hitBtn = document.getElementById('hit');
const message = document.getElementById('winningMessage');
const playerFirstCard = document.getElementById('playerCard1');
const playerSecondCard = document.getElementById('playerCard2');
const playerThirdCard = document.getElementById('playerCard3');
const playerFourthCard = document.getElementById('playerCard4');
const playerFifthCard = document.getElementById('playerCard5');
const playerSixthCard = document.getElementById('playerCard6');
const playerSeventhCard = document.getElementById('playerCard7');
const dealerFirstCard = document.getElementById('dealerCard1');
const dealerSecondCard = document.getElementById('dealerCard2');
const dealerThirdCard = document.getElementById('dealerCard3');
const dealerFourthCard = document.getElementById('dealerCard4');
const dealerFifthCard = document.getElementById('dealerCard5');
const dealerSixthCard = document.getElementById('dealerCard6');
const dealerSeventhCard = document.getElementById('dealerCard7');
const playerScore = document.getElementById('playerTotal');
const dealerScore = document.getElementById('dealerTotal');
const wagerAmt = [...document.querySelectorAll('#chipButtons > button')];
const currentWager = document.getElementById('wager');
const cashBalance = document.getElementById('cashValue');

newBetBtn.addEventListener('click', init);
dealBtn.addEventListener('click', handleDeal);
standBtn.addEventListener('click', handleStand);
hitBtn.addEventListener('click', handleHit);
document.getElementById('chipButtons').addEventListener('click', handleWager);

init();

function init() {
  pCard1 = null;
  pCard2 = null;
  pCard3 = null;
  pCard4 = null;
  pCard5 = null;
  pCard6 = null;
  pCard7 = null;
  dCard1 = null;
  dCard2 = null;
  dCard3 = null;
  dCard4 = null;
  dCard5 = null;
  dCard6 = null;
  dCard7 = null;
  totalp = 0;
  totald = 0;
  wager = null;
  renderNewBet();
}

function handleWager(evt) {
  const wagerIdx = wagerAmt.indexOf(evt.target);
  wager = CHIPS[wagerIdx];
  if (cash <= 0) return;
  renderWager();
}

function handleDeal() {
  if (wager == null) return;
  pCard1 = getRandomCard();
  pCard2 = getRandomCard();
  dCard1 = getRandomCard();
  totalp = CARDS[pCard1].value + CARDS[pCard2].value;
  totald = CARDS[dCard1].value;
  if (totalp == 21) {
    cash += wager;
    renderCash();
  }
  renderDeal();
  renderTotalScore();
  renderMessage();
}

function handleHit() {
  if (pCard3 !== null && pCard4 !== null && pCard5 !== null && pCard6 !== null && pCard7 == null) {
    pCard7 = getRandomCard();
    totalp = CARDS[pCard1].value + CARDS[pCard2].value + CARDS[pCard3].value + CARDS[pCard4].value + CARDS[pCard5].value + CARDS[pCard6].value + CARDS[pCard7].value;
    renderTotalScore();
    renderMessage();
  }
  if (pCard3 !== null && pCard4 !== null && pCard5 !== null && pCard6 == null) {
    pCard6 = getRandomCard();
    totalp = CARDS[pCard1].value + CARDS[pCard2].value + CARDS[pCard3].value + CARDS[pCard4].value + CARDS[pCard5].value + CARDS[pCard6].value;
    renderTotalScore();
    renderMessage();
  }
  if (pCard3 !== null && pCard4 !== null && pCard5 == null) {
    pCard5 = getRandomCard();
    totalp = CARDS[pCard1].value + CARDS[pCard2].value + CARDS[pCard3].value + CARDS[pCard4].value + CARDS[pCard5].value;
    renderTotalScore();
    renderMessage();
  }
  if (pCard3 !== null && pCard4 == null) {
    pCard4 = getRandomCard();
    totalp = CARDS[pCard1].value + CARDS[pCard2].value + CARDS[pCard3].value + CARDS[pCard4].value;
    renderTotalScore();
    renderMessage();
  }
  if (pCard3 == null) {
    pCard3 = getRandomCard();
    totalp = CARDS[pCard1].value + CARDS[pCard2].value + CARDS[pCard3].value;
    renderTotalScore();
    renderMessage();
  }
  if (totalp > 21) {
    cash -= wager;
    renderCash();
  }
  renderHit();
}

function handleStand() {
  if (totald <= 21 && dCard2 == null) {
    dCard2 = getRandomCard();
    totald = CARDS[dCard1].value + CARDS[dCard2].value;
  }
  setTimeout(function() {
    if (totald < 17 && dCard2 !== null && dCard3 == null) {
    dCard3 = getRandomCard();
    totald = CARDS[dCard1].value + CARDS[dCard2].value + CARDS[dCard3].value;
    }
  }, 1500);
  setTimeout(function() {
    if (totald < 17 && dCard2 !== null && dCard3 !== null && dCard4 == null) {
    dCard4 = getRandomCard();
    totald = CARDS[dCard1].value + CARDS[dCard2].value + CARDS[dCard3].value + CARDS[dCard4].value;
    }
  }, 2500);
  setTimeout(function() {
    if (totald < 17 && dCard2 !== null && dCard3 !== null && dCard4 !== null && dCard5 == null) {
    dCard5 = getRandomCard();
    totald = CARDS[dCard1].value + CARDS[dCard2].value + CARDS[dCard3].value + CARDS[dCard4].value + CARDS[dCard5].value;
    }
  }, 3500);
  setTimeout(function() {
    if (totald < 17 && dCard2 !== null && dCard3 !== null && dCard4 !== null && dCard5 !== null && dCard6 == null) {
    dCard6 = getRandomCard();
    totald = CARDS[dCard1].value + CARDS[dCard2].value + CARDS[dCard3].value + CARDS[dCard4].value + CARDS[dCard5].value + CARDS[dCard6].value;
    }
  }, 4500);
  setTimeout(function() {
    if (totald < 17 && dCard2 !== null && dCard3 !== null && dCard4 !== null && dCard5 !== null && dCard6 !== null && dCard7 == null) {
    dCard7 = getRandomCard();
    totald = CARDS[dCard1].value + CARDS[dCard2].value + CARDS[dCard3].value + CARDS[dCard4].value + CARDS[dCard5].value + CARDS[dCard6].value + CARDS[dCard7].value;
    }
  }, 5500);
setTimeout(renderMessage, 1000);
setTimeout(renderMessage, 2000);
setTimeout(renderMessage, 3000);
setTimeout(renderMessage, 4000);
setTimeout(renderMessage, 5000);
setTimeout(renderMessage, 6000);
setTimeout(renderStand, 1000);
setTimeout(renderStand, 2000);
setTimeout(renderStand, 3000);
setTimeout(renderStand, 4000);
setTimeout(renderStand, 5000);
setTimeout(renderStand, 6000);
setTimeout(renderTotalScore, 1000);
setTimeout(renderTotalScore, 2000);
setTimeout(renderTotalScore, 3000);
setTimeout(renderTotalScore, 4000);
setTimeout(renderTotalScore, 5000);
setTimeout(renderTotalScore, 6000);
setTimeout(checkWinner, 5600);
setTimeout(renderCash, 5600);
}

function checkWinner() {
  if (totald > 21) {
    cash += wager;
  }
  if (totald > 16 && totald < 22 && totald == totalp) {
    cash == cash;
  }
  if (totald > 16 && totald < 22 && totalp > totald) {
    cash += wager;
  }
  if (totald > 16 && totald < 22 && totald > totalp) {
    cash -= wager;
  }
}

function getRandomCard() {
  const card = Object.keys(CARDS);
  const cardIdx = Math.floor(Math.random() * card.length);
  return card[cardIdx];
}

function renderDeal() {
  dealBtn.style.visibility = 'hidden';
  newBetBtn.style.visibility = 'hidden';
  playerFirstCard.src = CARDS[pCard1].img;
  playerSecondCard.src = CARDS[pCard2].img;
  dealerFirstCard.src = CARDS[dCard1].img;
  dealerSecondCard.src = BACKCARD;
}

function renderTotalScore() {
playerScore.innerText = totalp;
dealerScore.innerText = totald;
}

function renderHit() {
playerThirdCard.src = CARDS[pCard3].img;
playerFourthCard.src = CARDS[pCard4].img;
playerFifthCard.src = CARDS[pCard5].img;
playerSixthCard.src = CARDS[pCard6].img;
playerSeventhCard.src = CARDS[pCard7].img;
}

function renderStand() {
dealerSecondCard.src = CARDS[dCard2].img;
dealerThirdCard.src = CARDS[dCard3].img;
dealerFourthCard.src = CARDS[dCard4].img;
dealerFifthCard.src = CARDS[dCard5].img;
dealerSixthCard.src = CARDS[dCard6].img;
dealerSeventhCard.src = CARDS[dCard7].img;
}

function renderMessage() {
  if (CARDS[pCard1].value + CARDS[pCard2].value == 21) {
    message.innerText = `BLACKJACK! Win: $${wager}`;
    message.style.visibility = "visible";
    newBetBtn.style.visibility = "visible";
    dealBtn.style.visibility = "hidden";
    standBtn.style.visibility = "hidden";
    hitBtn.style.visibility = "hidden";
  }
  if (totalp > 21) {
    message.innerText = "Bust: Lose!";
    message.style.visibility = "visible";
    standBtn.style.visibility = "hidden";
    hitBtn.style.visibility = "hidden";
    newBetBtn.style.visibility = "visible";
  }
  if (totald > 21) { 
    message.innerText = `Win: $${wager}`;
    message.style.visibility = "visible";
    newBetBtn.style.visibility = "visible";
    standBtn.style.visibility = "hidden";
    hitBtn.style.visibility = "hidden";
  }
  if (totald > 16 && totald < 22 && totald > totalp) { 
    message.innerText = "Lose!";
    message.style.visibility = "visible";
    newBetBtn.style.visibility = "visible";
    standBtn.style.visibility = "hidden";
    hitBtn.style.visibility = "hidden";
  }
  if (totald > 16 && totald < 22 && totalp > totald) { 
    message.innerText = `Win: $${wager}`;
    message.style.visibility = "visible";
    newBetBtn.style.visibility = "visible";
    standBtn.style.visibility = "hidden";
    hitBtn.style.visibility = "hidden";
  }
  if (totald > 16 && totald < 22 && totald == totalp) {
    message.innerText = "Push!";
    message.style.visibility = "visible";
    newBetBtn.style.visibility = "visible";
    standBtn.style.visibility = "hidden";
    hitBtn.style.visibility = "hidden";
  }
}

function renderNewBet() {
  newBetBtn.style.visibility = "visible";
  standBtn.style.visibility = "visible";
  hitBtn.style.visibility = "visible";
  dealBtn.style.visibility = "visible";
  message.style.visibility = "hidden";
  playerScore.innerText = totalp;
  dealerScore.innerText = totald;
  playerFirstCard.src = " ";
  playerSecondCard.src = " ";
  playerThirdCard.src = " ";
  playerFourthCard.src = " ";
  playerFifthCard.src = " ";
  playerSixthCard.src = " ";
  playerSeventhCard.src = " ";
  dealerFirstCard.src = " ";
  dealerSecondCard.src = " ";
  dealerThirdCard.src = " ";
  dealerFourthCard.src = " ";
  dealerFifthCard.src = " ";
  dealerSixthCard.src = " ";
  dealerSeventhCard.src = " ";
  currentWager.innerText = " ";
}

function renderCash() {
  cashBalance.innerText = `CASH: $${cash}`;
}

function renderWager() {
  currentWager.innerText = `$${wager}`;
  currentWager.style.fontSize = "40px";
  currentWager.style.paddingLeft = "4vmin";
  currentWager.style.paddingTop = "4vmin";
}












// blackjack.js
const startGameBtn = document.getElementById("start-game");
const hitBtn = document.getElementById("hit");
const standBtn = document.getElementById("stand");
const playerCardsDiv = document.getElementById("player-cards");
const dealerCardsDiv = document.getElementById("dealer-cards");
const messageDiv = document.getElementById("message");

let playerCards = [];
let dealerCards = [];
let deck = [];
const placeBetBtn = document.getElementById("place-bet");
const betAmountInput = document.getElementById("bet-amount");

let chips = 1000;
let currentBet = 0;

function updateChipsDisplay() {
  showMessage(`Chips: ${chips}`);
}

function placeBet() {
  currentBet = parseInt(betAmountInput.value);
  if (currentBet > chips) {
    showMessage("You don't have enough chips to place this bet.");
  } else {
    chips -= currentBet;
    updateChipsDisplay();
    startGame();
  }
}

function createDeck() {
  deck = [];
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ value, suit });
    }
  }
  return deck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function dealCard(deck, recipient) {
  const card = deck.pop();
  recipient.push(card);
  return card;
}

function calculateHandValue(hand) {
  let value = 0;
  let aces = 0;
  for (const card of hand) {
    if (card.value === "A") {
      aces++;
      value += 11;
    } else if (["K", "Q", "J"].includes(card.value)) {
      value += 10;
    } else {
      value += parseInt(card.value);
    }

    while (value > 21 && aces > 0) {
      value -= 10;
      aces--;
    }
  }
  return value;
}

function renderCard(card, recipientDiv) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.textContent = `${card.value} of ${card.suit}`;
  recipientDiv.appendChild(cardDiv);
}

function renderHand(hand, recipientDiv) {
  recipientDiv.innerHTML = "";
  for (const card of hand) {
    renderCard(card, recipientDiv);
  }
}

function showMessage(message) {
  messageDiv.textContent = message;
}

function startGame() {
  playerCards = [];
  dealerCards = [];
  createDeck();
  shuffleDeck(deck);
  dealCard(deck, playerCards);
  dealCard(deck, playerCards);
  dealCard(deck, dealerCards);
  renderHand(playerCards, playerCardsDiv);
  renderHand(dealerCards, dealerCardsDiv);
  showMessage("Player's turn");
  hitBtn.disabled = false;
  standBtn.disabled = false;
  placeBetBtn.disabled = true;
}

function hit() {
  dealCard(deck, playerCards);
  renderHand(playerCards, playerCardsDiv);
  if (calculateHandValue(playerCards) > 21) {
    showMessage("Player busted! Dealer wins.");
    hitBtn.disabled = true;
    standBtn.disabled = true;
  }
}

function stand() {
  hitBtn.disabled = true;
  standBtn.disabled = true;
  showMessage("Dealer's turn");
  while (calculateHandValue(dealerCards) < 17) {
    dealCard(deck, dealerCards);
    renderHand(dealerCards, dealerCardsDiv);
  }
  if (dealerValue > 21) {
    endGame("win");
  } else if (dealerValue === playerValue) {
    endGame("tie");
  } else if (dealerValue > playerValue) {
    endGame("lose");
  } else {
    endGame("win");
  }
}
 function endGame(result) {
  if (result === "win") {
    showMessage("Player wins!");
    chips += currentBet * 2;
  } else if (result === "tie") {
    showMessage("It's a tie!");
    chips += currentBet;
  } else {
    showMessage("Dealer wins.");
  }
  updateChipsDisplay();
  placeBetBtn.disabled = false;
 }

placeBetBtn.addEventListener("click", placeBet);
 
  const playerValue = calculateHandValue(playerCards);
  const dealerValue = calculateHandValue(dealerCards);
updateChipsDisplay();
startGameBtn.disabled = true;

startGameBtn.addEventListener("click", startGame);
hitBtn.addEventListener("click", hit);
standBtn.addEventListener("click", stand);

hitBtn.disabled = true;
standBtn.disabled = true;

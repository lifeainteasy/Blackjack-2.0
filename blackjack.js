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

  const playerValue = calculateHandValue(playerCards);
  const dealerValue = calculateHandValue(dealerCards);

  if (dealerValue > 21) {
    showMessage("Dealer busted! Player wins.");
  } else if (dealerValue === playerValue) {
    showMessage("It's a tie!");
  } else if (dealerValue > playerValue) {
    showMessage("Dealer wins.");
  } else {
    showMessage("Player wins.");
  }
}

startGameBtn.addEventListener("click", startGame);
hitBtn.addEventListener("click", hit);
standBtn.addEventListener("click", stand);

hitBtn.disabled = true;
standBtn.disabled = true;

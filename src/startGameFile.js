import { gameState } from "./gameData";
import { startTimerFunction } from "./time";
import { userBot, botBot } from "./bots";
import { resetGame } from "./resetGameFile";
import { initializeRoadLines } from "./render";
import { select, manageUserMode, addPlayer } from "./userManage";
import { displayText } from "./displayTextfile";
import { check } from "./checkInput";
import { gameManager } from "./main";

/**
 * Starts the game logic based on the selected mode (computer or custom bots).
 */
function startGame() {
  if (gameState.computer && gameState.botCreated) {
    userBot(gameState.text);
    botBot();
  } else if (gameState.custom) {
    userBot(gameState.text);
    gameState.bots.forEach((bot) => botBot(bot.name, bot.power));
  }

  // Default mode: Only check user input
  userBot(gameState.text);
}

/**
 * Handles game initialization, starts the timer, and sets up event listeners.
 */
export function callTostartGame() {
  startGame();
  startTimerFunction();

  const textInput = document.querySelector(".text-input");
  if (textInput) {
    textInput.addEventListener("input", check);
  }
}

/**
 * Displays a "Let's Go" message briefly before starting the game.
 */
async function callTostart() {
  const togo = document.querySelector(".togo");
  if (!togo) return;

  togo.textContent = "Let's Go ...";
  togo.style.display = "block";

  // Wait for 1 second before hiding the message
  await new Promise(resolve => setTimeout(resolve, 1000));

  togo.textContent = "";
  togo.style.display = "none";

  // Start the game
  callTostartGame();
}

/**
 * Countdown before the game starts.
 */
function startCountdown() {
  const count = document.querySelector(".counter");
  if (!count) return;

  let counter = 3;
  count.style.display = "block";

  const interval = setInterval(() => {
    count.textContent = counter;

    if (counter === 0) {
      clearInterval(interval);
      count.style.display = "none";
      resetGame();
      callTostart();
    }

    counter--;
  }, 1000);
}

/**
 * Sets up event listener on the start button to trigger the countdown.
 */
export function toStart() {
  const start = document.querySelector(".starter");
  if (!start) return;

  start.addEventListener("click", () => {
    const count = document.querySelector(".counter");
    if (!count) return;

    count.style.display = "block";
    startCountdown();
    // gameManager()
  });
}

/**
 * Handles the transition from the start screen to the game area.
 */
export function toStartGame() {
  const mainArea = document.querySelector(".main-area");
  const submit = document.querySelector(".startButton");
  const openToStart = document.querySelector(".tostart");

  if (!mainArea || !submit || !openToStart) return;

  submit.addEventListener("click", () => {
    mainArea.style.display = "flex";
    openToStart.style.display = "none";
    initializeGame();
  });
}

/**
 * Initializes the game by setting up UI components and user management.
 */
function initializeGame() {
  toStart();
  initializeRoadLines();
  displayText(gameState.text);
  select();
  addPlayer();
}




import { gameState } from "./gameData";
import { resetTimer } from "./time";
import { userBot, botBot } from "./bots";
import { resetGame } from "./resetGame";
import { startTimerFunction } from "./time";
import { initializeRoadLines } from "./render";
import {select} from "./userManage"
import { displayText } from "./displayTextfile";
import { manageUser, addPlayer } from "./userManage";
import { check } from "./checkInput";
 
 function startGame() {

  if ( gameState.computer &&  gameState.botCreated) {
    resetTimer();
    userBot(gameState.text);
    botBot();
  } else if ( gameState.custom) {
    userBot(gameState.text);
    gameState.bots.forEach((bot) => {
      botBot(bot.name, bot.power);
    });

    userBot(gameState.text);

  }
  // Mode par défaut : vérifier uniquement l'entrée
  userBot(gameState.text);
}

export function callTostartGame() {
  resetGame()
//   displayScores();
  startGame();

  startTimerFunction();

  const textInput = document.querySelector(".text-input");
  textInput.addEventListener("input", check);
  return; 
}

async function callTostart() {
    const togo = document.querySelector(".togo");
    togo.innerHTML = "Let's Go ...";
    togo.style.display = "block";
    
    // Attendre 1 seconde
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Réinitialiser l'élément après la pause
    togo.innerHTML = "";
    togo.style.display = "none";
    
    // Lancer le démarrage du jeu
    callTostartGame();
  }

function startCountdown() {
  const count = document.querySelector(".counter");
  let counter = 3;
  const interval = setInterval(() => {
    count.textContent = counter;
    if (counter === 0) {
      clearInterval(interval);
      count.style.display = "none";
       callTostart();
    }
    counter--;

  }, 1000);
} 

export function toStart() {
  resetGame()
  const start = document.querySelector(".starter");
  start.addEventListener("click", () => {
    const count = document.querySelector(".counter");
    count.style.display = "block";
    startCountdown();
  });
}

export function toStartGame() {
  const mainArea = document.querySelector(".main-area");
  const submit = document.querySelector(".startButton");
  const openToStart = document.querySelector(".tostart");

  submit.addEventListener("click", () => {
    mainArea.style.display = "flex";
    openToStart.style.display = "none";
    initializeGame();

  });
}
function initializeGame() {
  toStart();
  initializeRoadLines();
  displayText();
  manageUser();
  select();
  addPlayer();
}
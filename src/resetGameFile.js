import { gameState } from "./gameData";
import { resetTimer } from "./time";

export function resetGame() {
  
  console.log('resetgame is called')
  const userCar = document.querySelector(".user-car");
  const botCar = document.querySelector("#robot-car");
  const inputArea = document.querySelector(".text-input");

  // Arrêter le timer si actif
  if (gameState.timerInterval) {
    clearInterval(gameState.timerInterval);
    gameState.timerInterval = null;
  }

  clearInterval(gameState.botInterval); 

  if (gameState.botInterval) {
    clearInterval(gameState.botInterval);
    gameState.botInterval = null;
  }

  // Réinitialiser les valeurs générales
  gameState.startTime = null;
  gameState.userProgress = 0;
  gameState.botProgress = 0;
  gameState.botFinished = false;
  gameState.userFinished = false;
  gameState.userErrors = 0;
  inputArea.value = "";
  resetTimer()

  // Réinitialiser les tableaux (force un nouvel objet en mémoire)
  gameState.userWPMData = [...[]];
  gameState.userCPMData = [...[]];
  gameState.botWPMData = [...[]];
  gameState.botCPMData = [...[]];
  gameState.timeData = [...[]];

  console.log("time is ", gameState.timeData)
  // Réinitialiser l'affichage des voitures
  userCar.style.transform = "translateX(0)";
  if (botCar) botCar.style.transform = "translateX(0)";

  if (gameState.normal) {
    // Mode normal : rien d'autre à faire
  } else if (gameState.custom && gameState.computer && gameState.botCreated) {
    // Mode personnalisé avec bots
    gameState.bots = [...[]];
    gameState.botCreated = false;
  }

  // Réinitialiser le graphique s'il existe
  if (gameState.startChart) {
    gameState.startChart.destroy();
    gameState.startChart = null;
  }

  // Log pour vérifier la réinitialisation
  console.log("Game reset:", JSON.parse(JSON.stringify(gameState)));
}

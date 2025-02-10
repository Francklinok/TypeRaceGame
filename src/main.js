import { gameState, TextManager, GameLevel } from "./gameData";
import { themLoader } from "./theme";
import { gameResult } from "./gamResult";
import { toStartGame } from "./startGameFile";
import { endGame } from "./bots";
import { displayText } from "./displayTextfile";
import { manageUserMode } from "./userManage";

const gameLevel = new GameLevel();

export async function gameManager() {
  manageUserMode();
  
  console.log("🔄 gameManager() called");
  console.log("📊 gameState:", gameState);

  if (gameState.userFinished && !gameState.botFinished) {
    console.log("🏆 User finished first");
    gameLevel.nextLevel(); // Corrigé
  } else if (gameState.botFinished && !gameState.userFinished) {
    console.log("🤖 Bot won");
    gameLevel.restartGame();
  }
  gameState.text = gameLevel.text;
  displayText(gameLevel.text); // Toujours afficher le bon texte après mise à jour
}

// Démarrage du jeu
document.addEventListener("DOMContentLoaded", async () => {
  toStartGame();
  themLoader();
  await gameManager();
  displayText(gameLevel.text);
  gameResult(gameState.text);
});



// import {gameState, TextManager, GameLevel } from "./gameData";
// import { themLoader } from "./theme";
// import { gameResult } from "./gamResult";
// import { toStartGame } from "./startGameFile";
// import { endGame } from "./bots";
// import { displayText } from "./displayTextfile";
// import { manageUserMode } from "./userManage";


// const gameLevel = new GameLevel()

// export async function gameManager() {
//   manageUserMode();
//   // let indice = 0;

//   console.log("🔄 gameManager() called");
//   console.log("📊 gameState:", gameState);

//   if (gameState.userFinished && !gameState.botFinished) {
//     console.log("🏆 User finished first");
//     console.log("🔍 Normal Mode:", gameState.normal);
//     console.log("✅ userFinished:", gameState.userFinished);
//     gameLevel.next()
//   } else if (gameState.botFinished && !gameState.userFinished) {
//     console.log("🤖 Bot won");
//     gameLevel.restartGame()

//   }
//   // displayText(gameState.text);

// }


// // Démarrage du jeu
// document.addEventListener("DOMContentLoaded", async () => {
//   toStartGame();
//   themLoader();
//   await gameManager();
//   displayText(gameLevel.text)
//   gameResult(gameState.text);
// });




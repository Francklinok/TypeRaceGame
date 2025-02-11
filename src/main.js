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

function scrollLeft() {
  const leftScroll = document.querySelector('.scrollI');
  const container = document.querySelector('.container');

  leftScroll.addEventListener('click', () => {
    if (container.classList.contains("hidden")) {
      container.classList.remove("hidden");
      container.classList.add("visible");
    } else {
      container.classList.remove("visible");
      container.classList.add("hidden");
    }
  });
}


// function scrollLeft(){
//   const leftScroll = document.querySelector('.scroll')
//   const container = document.querySelector('.container')
//   leftScroll.addEventListener('click', ()=>{
//     if(container.style.display = "none"){
//       container.style.display = 'flex'

//     }else{
//       container.style.display = "none"

//     }

//   })
// }
// Démarrage du jeu
document.addEventListener("DOMContentLoaded", async () => {
  toStartGame();
  themLoader();
  await gameManager();
  displayText(gameLevel.text);
  gameResult(gameState.text);
  scrollLeft()
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




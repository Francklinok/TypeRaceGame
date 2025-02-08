import { textManager, namesContainer, powerContainer, gameState } from "./gameData";
import { themLoader } from "./theme";
import { gameResult } from "./gamResult";
import { toStartGame } from "./startGameFile";
import { endGame } from "./bots";

/**
 * Moves to the next level by updating the game text.
 * If the user wins, the text changes. Otherwise, it remains the same.
 */
function moveNextLevel() {
  console.log("🔄 moveNextLevel() called");
  setTimeout(() =>{
    const newText = textManager.nextText();
    gameState.text = newText;
    console.log("🚀 New text:", newText);
    displayText(gameState.text);
  },5000)
  return;
}

/**
 * Resets the current level by keeping the same text.
 * Used when the user loses.
 */
function reStartLevel() {
  console.log("🔄 reStartLevel() called");

  // Retrieve the current text from textManager
  const currentText = textManager.getCurrentText();
  
  // Maintain the same text in game state
  gameState.text = currentText;
  console.log("🔄 Restarting with text:", currentText);
  return;
}


/**
 * Manages game progression based on the user's and bot's performance.
 */

// Fonction de gestion du jeu
function gameManager() { 
  console.log("🔄 gameManager() appelé");
  let currentText = reStartLevel();
  gameState.text = currentText;
  
  if (!gameState.normal) {
    if (gameState.userFinished && !gameState.botFinished) {
      // alert("🎉 User finished first!");
      moveNextLevel();
      // alert("🚀 Prochain texte: " + gameState.text);
      endGame();
    } else if (gameState.botFinished && !gameState.userFinished) {
      // alert("❌ User lost!");  
      reStartLevel();
      alert("🔄 Recommencer avec: " + gameState.text);
      endGame();
    }
  }else{
    if (gameState.userFinished) {
      alert("🎉 User won the game!");
      moveNextLevel(); 
      // alert("🚀 Prochain texte: " + gameState.text);
      endGame();
    }
  }
}
console.log("current text is :", gameState.text); 
console.log(gameState.userFinished)


// function gameManager() { 
//   console.log("🔄 gameManager() called");

//   if (gameState.normal) {
//     if (gameState.userFinished) {
//       alert("🎉 User won the game!");
//       moveNextLevel();s
//     }
//   } else if (gameState.computer || gameState.custom) {
//     if (gameState.userFinished && !gameState.botFinished) {
//       alert("🎉 User finished first!");
//       moveNextLevel();
//     } else if (gameState.botFinished && !gameState.userFinished) {
//       alert("❌ User lost!");
//       reStartLevel();
//     }
//   }

//   console.log("Current text is:", gameState.text);

//   // End the game regardless of the result
//   endGame();
// }

/**
 * Initializes the game setup when the DOM is loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
  toStartGame();
  themLoader();
  gameResult();
  gameManager()
});


// import { textManager,namesContainer, powerContainer, gameState } from "./gameData";
// import {themLoader} from "./theme"
// // import {displayFinalChart} from "./graph"
// import { gameResult } from "./gamResult";
// import { toStartGame } from "./startGameFile";
// import { endGame } from "./bots";


// // Fonction pour réinitialiser le niveau courant
// function reStartLevel() {
//   console.log("🔄 reStartLevel() appelé");
//   // Récupérer le texte courant via textManager
//   const currentText = textManager.getCurrentText();
//   // Mettre à jour l'état du jeu avec le texte courant
//   console.log("current text is",currentText)
//   gameState.text = currentText;
//   console.log("🔄 Texte du niveau réinitialisé:", currentText);
// }

// // Fonction de gestion du jeu
// function gameManager() { 
//   console.log("🔄 gameManager() appelé");
//     // alert("🎉 User won the game!");
//     moveNextLevel(); 
//     // alert("🚀 Prochain texte: " + gameState.text);
//     endGame();

//   // Pour le mode normal
//   if (gameState.normal) {
//     if (gameState.userFinished) {
//       alert("🎉 User won the game!");
//       moveNextLevel(); 
//       // alert("🚀 Prochain texte: " + gameState.text);
//       endGame();
//     }
//   } 
//   // Pour les modes computer ou custom
//   else if (gameState.computer || gameState.custom) {
//     if (gameState.userFinished && !gameState.botFinished) {
//       // alert("🎉 User finished first!");
//       moveNextLevel();
//       // alert("🚀 Prochain texte: " + gameState.text);
//       endGame();
//     } else if (gameState.botFinished && !gameState.userFinished) {
//       // alert("❌ User lost!");  
//       reStartLevel();
//       alert("🔄 Recommencer avec: " + gameState.text);
//       endGame();
//     }
//   }
//   console.log("current text is :", gameState.text);
// }
// console.log(gameState.userFinished)


// document.addEventListener("DOMContentLoaded", () => {
//   toStartGame();
//   themLoader();
//   gameResult();
//   gameManager()

// });

// // function displayScores() {
// //   const scoreElement = document.querySelector(".graph .performance span");
// //   scoreElement.textContent = `Utilisateur: ${gameState.userScore} | Robot: ${gameState.botScore}`;
// // }

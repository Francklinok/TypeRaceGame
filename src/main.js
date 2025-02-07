import { textManager,namesContainer, powerContainer, gameState } from "./gameData";
import {themLoader} from "./theme"
// import {displayFinalChart} from "./graph"
import { gameResult } from "./gamResult";
import { toStartGame } from "./startGameFile";


// function moveNextLevel() {
//   console.log("🔄 moveNextLevel() appelé");
//   gameState.text = "";
//   gameState.text = textManager.nextText();
//   console.log("🚀 Nouveau texte:", newText);
//   return ;  
// }

// function reStartLevel() {
//   console.log("🔄 reStartLevel() appelé");
//   gameState.text = textManager.getCurrentText(); 
//   console.log("🔄 Texte du niveau réinitialisé:", restartText);
//   return ; 
// }

// function gameManager() { 
//   console.log("🔄 gameManager() appelé");
//   if (gameState.normal || '' ) {
//     if (gameState.userFinished) {
//       alert("🎉 User won the game!");
//       moveNextLevel(); 
//       alert("🚀 Prochain texte: " + resultText);
//       endGame();
//     }
//   } else if (gameState.computer || gameState.custom) {
//     if (gameState.userFinished && !gameState.botFinished) {
//       alert("🎉 User finished first!");
//       moveNextLevel();
//       alert("🚀 Prochain texte: " + resultText);
//       endGame();
//     } else if (gameState.botFinished && !gameState.userFinished) {
//       alert("❌ User lost!");  
//       reStartLevel();
//       alert("🔄 Recommencer avec: "+ gameState.text);
//       endGame();
//     }
//   }
//   console.log("current text is :", gameState.text)

// }
// Fonction pour passer au niveau suivant
function moveNextLevel() {
  console.log("🔄 moveNextLevel() appelé");
  // Récupérer le nouveau texte via textManager
  const newText = textManager.nextText();
  // Mettre à jour l'état du jeu avec le nouveau texte
  gameState.text = newText;
  console.log("🚀 Nouveau texte:", newText);
}

// Fonction pour réinitialiser le niveau courant
function reStartLevel() {
  console.log("🔄 reStartLevel() appelé");
  // Récupérer le texte courant via textManager
  const currentText = textManager.getCurrentText();
  // Mettre à jour l'état du jeu avec le texte courant
  console.log("current text is",currentText)
  gameState.text = currentText;
  console.log("🔄 Texte du niveau réinitialisé:", currentText);
}

// Fonction de gestion du jeu
function gameManager() { 
  console.log("🔄 gameManager() appelé");
    // alert("🎉 User won the game!");
    moveNextLevel(); 
    // alert("🚀 Prochain texte: " + gameState.text);
    endGame();

  // Pour le mode normal
  if (gameState.normal) {
    if (gameState.userFinished) {
      alert("🎉 User won the game!");
      moveNextLevel(); 
      // alert("🚀 Prochain texte: " + gameState.text);
      endGame();
    }
  } 
  // Pour les modes computer ou custom
  else if (gameState.computer || gameState.custom) {
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
  }
  console.log("current text is :", gameState.text);
}
console.log(gameState.userFinished)


document.addEventListener("DOMContentLoaded", () => {
  toStartGame();
  themLoader();
  gameResult();
  gameManager()

});

// function displayScores() {
//   const scoreElement = document.querySelector(".graph .performance span");
//   scoreElement.textContent = `Utilisateur: ${gameState.userScore} | Robot: ${gameState.botScore}`;
// }

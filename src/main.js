import { gameState, TextManager, GameLevel } from "./gameData";
import { themLoader } from "./theme";
import { toStartGame } from "./startGameFile";
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
  displayText(gameLevel.text); 
}

function scrollLeft() {
  const leftSection = document.getElementById('leftSection');
  const scrollBtn = document.getElementById('scrollBtn');

  scrollBtn.addEventListener('click', () => {
    if (leftSection.classList.contains('hidden')) {
      leftSection.style.display = "flex"; 
      requestAnimationFrame(() => {
        leftSection.classList.remove('hidden');
      });
    } else {
      leftSection.classList.add('hidden');

      leftSection.addEventListener('transitionend', function handler() {
        if (leftSection.classList.contains('hidden')) {
          leftSection.style.display = "none";
        }
        leftSection.removeEventListener('transitionend', handler);
      });
    }
  });
}



document.addEventListener("DOMContentLoaded", async () => {
  toStartGame();
  themLoader();
  await gameManager();
  displayText(gameLevel.text);
  scrollLeft()
});





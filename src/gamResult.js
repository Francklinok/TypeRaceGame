
import { gameState } from "./gameData";

// Updated game result tracking
export function gameResult(targetText) {
  const inputArea = document.querySelector(".text-input");
  const resultContainer = document.querySelector(".resultElement");
  
  if (!inputArea || !resultContainer) return;

  const handleResult = () => {
    if (!gameState.startTime) return;

    // Calculate elapsed time
    const timeElapsed = (Date.now() - gameState.startTime) / 1000;
    const words = targetText.split(/\s+/);
    
    // Calculate WPM and CPM
    const userWPM = Math.round((words.length / timeElapsed) * 60) || 0;
    const userCPM = Math.round((inputArea.value.length / timeElapsed) * 60) || 0;

    // Update max values
    if (userWPM > gameState.maxWPM) gameState.maxWPM = userWPM;
    if (userCPM > gameState.maxCPM) gameState.maxCPM = userCPM;
    if (timeElapsed < gameState.bestTime) gameState.bestTime = timeElapsed;

    // Update display
    updateResults(resultContainer, {
      wpm: userWPM,
      cpm: userCPM,
      time: timeElapsed,
      accuracy: gameState.precision,
      errors: gameState.userErrors,
      words: words.length
    });
  };

  // Update results periodically during typing
  const updateInterval = setInterval(() => {
    if (gameState.userFinished) {
      clearInterval(updateInterval);
      return;
    }
    handleResult();
  }, 100);

  // Final update when input loses focus
  inputArea.addEventListener("blur", handleResult);
}

// Helper function to update result display
function updateResults(container, stats) {
  container.style.display = "flex";
  
  const updates = {
    wpm: `WPM: ${stats.wpm}`,
    cpm: `CPM: ${stats.cpm}`,
    'time-data': `Time: ${stats.time.toFixed(2)}s`,
    'accuracy-data': `Accuracy: ${stats.accuracy}%`,
    'error-data': `Errors: ${stats.errors}`,
    'word-data': `Words: ${stats.words}`
  };

  Object.entries(updates).forEach(([className, value]) => {
    let element = container.querySelector(`.${className}`);
    if (!element) {
      element = document.createElement("span");
      element.className = className;
      container.appendChild(element);
    }
    element.textContent = value;
  });
}

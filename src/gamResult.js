
import { gameState } from "./gameData";
 

export function gameResult() {
    const inputArea = document.querySelector(".text-input");
    const targetText = gameState.text;
    // document.querySelector(".text-container")
    // .textContent.trim(); // Correction
    const words = targetText.split(/\s+/);
  
    inputArea.addEventListener("input", () => {
      if (! gameState.startTime)  gameState.startTime = Date.now();
      const userTyped = inputArea.value;
  
    //   countErrors(userTyped, targetText);
  
      const userWPM = Math.max(...gameState.userWPMData, 0); // Meilleur score WPM
      const userCPM = Math.max(...gameState.userCPMData, 0); // Meilleur score CPM
      const timeElapsed = Math.max(...gameState.timeData, 0);
      const accuracy = gameState.accuracy
      const errorCount =  gameState.userErrors;
  
      // Mise à jour des résultats
      const resultContainer = document.querySelector(".resultElement");
      resultContainer.style.display = "flex";
      // Fonction utilitaire pour créer et mettre à jour un élément
      const updateResultElement = (className, value) => {
        let element = resultContainer.querySelector(`.${className}`);
        if (!element) {
          element = document.createElement("span");
          element.className = className;
          resultContainer.appendChild(element);
        }
        element.textContent = value;
      };
    
      updateResultElement("wpm", `WPM: ${ userWPM}`);
      updateResultElement("cpm", `CPM: ${ userCPM}`);
      updateResultElement("time-data", `Time: ${ timeElapsed}s`);
      updateResultElement("accuracy-data", `Accuracy: ${ accuracy}%`);
      updateResultElement("error-data", `Errors: ${ errorCount}`);
      updateResultElement("word-data", `Words: ${words.length}`);
    });
  
  }
   
import { gameState } from "./gameData";
import { stopTimer, updateDisplay } from "./time";
import { displayFinalChart } from "./graph";
import { resetGame } from "./resetGameFile";
// import { textManager } from "./gameData";
import { gameManager } from "./main";

// Fonction pour déplacer la voiture
export function moveCar(car, progress) {
  if (!car) return;
  const trackWidth = document.querySelector("#race-track")?.offsetWidth || 0;
  const carWidth = car.offsetWidth;
  const maxPosition = trackWidth - carWidth;
  const position = Math.min(Math.max(progress * maxPosition, 0), maxPosition);
  car.style.transform = `translateX(${position}px)`;
  return;
}

export function endGame() {
  console.log("🏁 Fin de la partie");
  stopTimer();
  
  // Réinitialise les stats pour les deux joueurs
  updateWPMCPM(0, 0, "user");
  updateWPMCPM(0, 0, "bot");
  
  if (gameState.userFinished) {
    gameState.userScore++;
    alert("🏆 Victoire !");
    displayFinalChart();
    gameManager()
    // return textManager.currentIndex ++
  } else {
    alert("❌ Défaite");
    displayFinalChart();
    // return textManager.currentIndex;
  }
  

}

// // Calcul des erreurs amélioré
// export function compterErreurs(targetText, userTyped) {
//   gameState.nbErreurs = 0;
//   for (let i = 0; i < userTyped.length; i++) {
//     if (userTyped[i] !== targetText[i]) {
//       gameState.nbErreurs++;
//     }
//   }
//   return gameState.nbErreurs;
// }

// // Calcul de précision amélioré
// export function calculerPrecision(targetText, userTyped) {
//   if (!userTyped.length) return 100;
  
//   gameState.nbErreurs = compterErreurs(targetText, userTyped);
//   gameState.nbCorrects = userTyped.length - gameState.nbErreurs;
//   gameState.precision = (gameState.nbCorrects / userTyped.length) * 100;
//   return gameState.precision;
// }
// export function compterErreurs(targetText, userTyped) {
//   gameState.nbErreurs = 0;

//   // Parcourt la longueur la plus courte pour éviter les dépassements
//   const minLength = Math.min(targetText.length, userTyped.length);

//   for (let i = 0; i < minLength; i++) {
//     if (userTyped[i] !== targetText[i]) {
//       gameState.nbErreurs++;
//     }
//   }

//   // Ajoute les caractères en trop si `userTyped` est plus long que `targetText`
//   gameState.nbErreurs += Math.abs(targetText.length - userTyped.length);

//   return gameState.nbErreurs;
// }

// export function calculerPrecision(targetText, userTyped) {
//   if (!targetText.length) return 0; // Éviter division par zéro

//   gameState.nbErreurs = compterErreurs(targetText, userTyped);
//   gameState.nbCorrects = Math.max(0, userTyped.length - gameState.nbErreurs); // Éviter les valeurs négatives

//   // S'assurer qu'on ne divise pas par zéro
//   gameState.precision = userTyped.length > 0 ? (gameState.nbCorrects / userTyped.length) * 100 : 100;

//   return gameState.precision;
// }

// export function calculerPrecision(targetText, userTyped) {
//   if (!targetText.length) return 0;

//   gameState.nbErreurs = compterErreurs(targetText, userTyped);
//   const nbCorrects = Math.max(0, userTyped.length - gameState.nbErreurs);

//   gameState.precision = targetText.length > 0 
//     ? (nbCorrects / targetText.length) * 100 
//     : 100;

//   return gameState.precision.toFixed(2);
// }
// export function compterErreurs(targetText, userTyped) {
//   let erreurs = 0;
//   const minLength = Math.min(targetText.length, userTyped.length);

//   for (let i = 0; i < minLength; i++) {
//     if (userTyped[i] !== targetText[i]) {
//       erreurs++;
//     }
//   }

//   erreurs += Math.abs(targetText.length - userTyped.length);
//   gameState.nbErreurs = erreurs;
//   return erreurs;
// }

// Improved error counting function
export function compterErreurs(targetText, userTyped) {
  let erreurs = 0;
  const minLength = Math.min(targetText.length, userTyped.length);

  // Compare each character
  for (let i = 0; i < minLength; i++) {
    if (userTyped[i] !== targetText[i]) {
      erreurs++;
    }
  }

  // Add remaining characters as errors if lengths differ
  erreurs += Math.abs(targetText.length - userTyped.length);
  
  // Update game state
  gameState.nbErreurs = erreurs;
  gameState.userErrors = erreurs;
  
  return erreurs;
}

// Improved precision calculation
export function calculerPrecision(targetText, userTyped) {
  if (!targetText.length) return 0;

  const erreurs = compterErreurs(targetText, userTyped);
  const correctChars = Math.max(0, userTyped.length - erreurs);
  
  // Calculate precision based on total text length
  const precision = (correctChars / targetText.length) * 100;
  gameState.precision = Math.max(0, Math.min(100, precision));
  
  return gameState.precision.toFixed(2);
}


// Gestion de la saisie utilisateur améliorée
export function userBot(targetText) {
  const inputArea = document.querySelector(".text-input");
  const userCar = document.querySelector(".user-car");
  const graphElement = document.querySelector(".graph");
  
  if (!inputArea || !userCar || !graphElement) return;

  const handleInput = () => {
    if (!gameState.startTime) gameState.startTime = Date.now();
    
    const userTyped = inputArea.value;
    calculerPrecision(targetText, userTyped);

    if (targetText.startsWith(userTyped)) {
      gameState.userProgress = userTyped.length / targetText.length;
      moveCar(userCar, gameState.userProgress);
      updateWPMCPMRealtime(userTyped, targetText, "user");

      if (userTyped === targetText) {
        gameState.userFinished = true;
        graphElement.scrollIntoView({ behavior: "smooth" });
        graphElement.style.display = "flex";
        endGame();
        return;
      }
      inputArea.style.color = "black";
    } else {
      inputArea.style.color = "red";
    }
  };

  inputArea.addEventListener("input", handleInput);
}

// Bot amélioré
export function botBot(bot = null, power = null) {
  const botCar = document.querySelector(`.${bot ? bot + "-car" : "bot-car"}`);
  if (!botCar) return;

  const text = gameState.text;
  const textLength = text.length;

  if (gameState.custom && bot && power) {
    handleCustomBot(bot, power, botCar, textLength);
  } else if (gameState.computer) {
    handleDefaultBot(botCar, text);
  }
}

// Fonctions auxiliaires pour le bot
export function handleCustomBot(bot, power, botCar, textLength) {
  let botProgress = 0;
  const wpm = parseInt(power, 10);
  const cpm = wpm * 5;
  const baseSpeed = wpm / (60 * textLength);

  const botInterval = setInterval(() => {
    if (!gameState.startTime) gameState.startTime = Date.now();
    
    botProgress = Math.min(botProgress + baseSpeed, 1);
    moveCar(botCar, botProgress);
    
    if (botProgress < 1) {
      updateWPMCPM(wpm, cpm, bot);
    } else {
      gameState.carFinished = true;
      endGame();
      clearInterval(botInterval);
    }
  }, 100);
}

export function handleDefaultBot(botCar, text) {
  gameState.botProgress = 0;
  gameState.botFinished = false;
  
  const baseSpeed = 3;
  const adjustedSpeed = (baseSpeed + Math.random() * 0.5) / (text.length * text.length);

  const botInterval = setInterval(() => {
    if (!gameState.startTime) gameState.startTime = Date.now();
    
    gameState.botProgress = Math.min(gameState.botProgress + adjustedSpeed, 1);
    const botTypedLength = Math.floor(gameState.botProgress * text.length);
    const botText = text.substring(0, botTypedLength);
    
    moveCar(botCar, gameState.botProgress);
    updateWPMCPMRealtime(botText, text, "bot");

    if (gameState.botProgress >= 1) {
      gameState.botFinished = true;
      endGame();
      clearInterval(botInterval);
      gameState.botInterval = null;
      return;
    }
  }, 16);
  
  gameState.botInterval = botInterval;
}


export function updateWPMCPM(wpm, cpm, player) {
  const wpmElement = document.querySelector(`.${player}-wpm`);
  const cpmElement = document.querySelector(`.${player}-cpm`);
  
  if (wpmElement && cpmElement) {
    // Vérifie si le jeu est terminé pour ce joueur
   
      if ((player === "user" && gameState.userFinished) || 
      (player === "bot" && gameState.botFinished)) {
      // Réinitialise l'affichage à 0
      setTimeout(() =>{
      wpmElement.innerHTML = `WPM: 0.00`;
      cpmElement.innerHTML = `CPM: 0.00`;
      // resetGame()
    },8000)
    } else {
      // Affiche les valeurs normalement pendant la partie
      wpmElement.innerHTML = `WPM: ${wpm.toFixed(2)}`;
      cpmElement.innerHTML = `CPM: ${cpm.toFixed(2)}`;
    }
   
  }

  updateChart(wpm, cpm, player);
}



export function updateWPMCPMRealtime(inputText, targetText, player) {
  if (!gameState.startTime) return;

  // Vérifie si le jeu est terminé pour ce joueur
  if ((player === "user" && gameState.userFinished) || 
      (player === "bot" && gameState.botFinished)) {
    updateWPMCPM(0, 0, player);
    return;
  }
  
  const elapsedTime = (Date.now() - gameState.startTime) / 60000;
  const wordsArray = inputText.trim().split(/\s+/);
  
  const wpm = wordsArray.length / elapsedTime;
  const cpm = inputText.length / elapsedTime;
  
  updateWPMCPM(wpm, cpm, player);
}

export  function updateChart(wpm, cpm, player) {
  const elapsedTime = updateDisplay();
  const maxDataPoints = 50;

  if ((player === "bot" && gameState.botFinished) || 
      (player === "user" && gameState.userFinished)) {
    // Ajoute une dernière valeur à 0 pour montrer la fin
    updateChartData(elapsedTime, 0, 0, player, maxDataPoints);
    return; 
  }

  updateChartData(elapsedTime, wpm, cpm, player, maxDataPoints);
  updateChartDisplay();
}

function updateChartDisplay() {
  if (gameState.startChart) {
    // Met à jour les labels (axe X - temps)
    gameState.startChart.data.labels = gameState.timeData;
    
    // Met à jour les données des datasets
    gameState.startChart.data.datasets[0].data = gameState.userWPMData;
    gameState.startChart.data.datasets[1].data = gameState.userCPMData;
    
    // Si vous avez des données pour le bot
    if (gameState.botWPMData && gameState.botCPMData) {
      if (gameState.startChart.data.datasets[2]) {
        gameState.startChart.data.datasets[2].data = gameState.botWPMData;
      }
      if (gameState.startChart.data.datasets[3]) {
        gameState.startChart.data.datasets[3].data = gameState.botCPMData;
      }
    }
    
    // Rafraîchit le graphique
    gameState.startChart.update();
  }
}

export function updateChartData(elapsedTime, wpm, cpm, player, maxDataPoints) {
  if (!gameState.timeData.includes(elapsedTime)) {
    gameState.timeData.push(elapsedTime);
    if (gameState.timeData.length > maxDataPoints) {
      gameState.timeData.shift();
    }
  }

  if (player === "user") {
    if (gameState.userProgress >= 1) {
      gameState.userFinished = true;
      gameState.userWPMData.push(0);
      gameState.userCPMData.push(0);
    } else {
      gameState.userWPMData.push(wpm);
      gameState.userCPMData.push(cpm);
    }
  } else {
    if (gameState.botProgress >= 1) {
      gameState.botFinished = true;
      gameState.botWPMData.push(0);
      gameState.botCPMData.push(0);
    } else {
      gameState.botWPMData.push(wpm);
      gameState.botCPMData.push(cpm);
    }
  }
}


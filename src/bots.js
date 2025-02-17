import { gameState } from "./gameData";
import { stopTimer, updateDisplay } from "./time";
import { displayFinalChart } from "./graph";
import { resetGame } from "./resetGameFile";
// import { textManager } from "./gameData";
import { gameManager } from "./main";
import { calculeError, gameResult } from "./gamResult";

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
    // alert("🏆 Victoire !");
    displayFinalChart();
    gameResult();
    gameManager();
  } else {
    // alert("❌ Défaite");
    displayFinalChart();
  }
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
    calculeError(targetText, userTyped)

    if (targetText.startsWith(userTyped)) {
      gameState.userProgress = userTyped.length / targetText.length;
      moveCar(userCar, gameState.userProgress);
      updateWPMCPMRealtime(userTyped, targetText, "user");

      if (userTyped === targetText) {
        endGame();
        gameState.userFinished = true;
        graphElement.style.display = "flex";
        setTimeout(() => {
          graphElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
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
  
  const elapsedTime = (Date.now() - gameState.startTime) / 60000; // temps en minutes
  
  // Ajoute une protection contre les valeurs trop petites de temps
  if (elapsedTime < 0.001) { // soit environ 1 seconde
    updateWPMCPM(0, 0, player);
    return;
  }

  const wordsArray = inputText.trim().split(/\s+/);
  const words = wordsArray.length > 0 ? wordsArray.length : 0;
  const chars = inputText.length;
  
  // Calcule WPM et CPM avec des limites raisonnables
  const wpm = Math.min(Math.max(words / elapsedTime, 0), 200); // limite max à 200 WPM
  const cpm = Math.min(Math.max(chars / elapsedTime, 0), 1000); // limite max à 1000 CPM
  
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
  // Vérifie si le temps est valide
  if (elapsedTime <= 0) return;

  // Ajoute le temps s'il n'existe pas déjà
  if (!gameState.timeData.includes(elapsedTime)) {
    gameState.timeData.push(elapsedTime);
    if (gameState.timeData.length > maxDataPoints) {
      gameState.timeData.shift();
    }
  }

  // Fonction helper pour ajouter des données avec validation
  const addDataPoint = (dataArray, value) => {
    if (dataArray.length >= maxDataPoints) {
      dataArray.shift();
    }
    if(elapsedTime < 0.001){
      data.dataArray.push(0)
      return ;
    }else{
      dataArray.push(Math.min(Math.max(value, 0), value));

    }
  };

  if (player === "user") {
    if (gameState.userProgress >= 1) {
      gameState.userFinished = true;
      addDataPoint(gameState.userWPMData, 0);
      addDataPoint(gameState.userCPMData, 0);
    } else {
      addDataPoint(gameState.userWPMData, wpm);
      addDataPoint(gameState.userCPMData, cpm);
    }
  } else {
    if (gameState.botProgress >= 1) {
      gameState.botFinished = true;
      addDataPoint(gameState.botWPMData, 0);
      addDataPoint(gameState.botCPMData, 0);
    } else {
      addDataPoint(gameState.botWPMData, wpm);
      addDataPoint(gameState.botCPMData, cpm);
    }
  }
}

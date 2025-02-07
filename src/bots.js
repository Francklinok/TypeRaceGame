import { gameState } from "./gameData";
import { stopTimer, updateDisplay } from "./time";
import { displayFinalChart } from "./graph";

export function moveCar(car, progress) {
    console.log("🔄 moveCar() appelé");
    const trackWidth = document.querySelector("#race-track").offsetWidth;
    const carWidth = car.offsetWidth;
    const maxPosition = trackWidth - carWidth;
    const position = progress * maxPosition;
    car.style.transform = `translateX(${position}px)`;
    return;
  }

  export function endGame () {
    console.log("endgame est appeler")
  
    if(gameState.userFinished){
      console.log(gameState.userFinished)
      stopTimer()
      alert("user win")
      gameState.userScore++;
      return;
  
    } else{
      alert("user lose")
      gameState.userScore;
  
    }
    displayFinalChart();
  
  }
  /**
 * Calcule le nombre d'erreurs dans la saisie utilisateur.
 * Pour chaque caractère tapé, si celui-ci ne correspond pas
 * au caractère de même position dans targetText, on incrémente le compteur.
 *
 * @param {string} targetText - Le texte attendu.
 * @param {string} userTyped - Le texte saisi par l'utilisateur.
 * @returns {number} - Le nombre d'erreurs.
 */
export function compterErreurs(targetText, userTyped) {
    // Parcourir chaque caractère tapé par l'utilisateur
    for (let i = 0; i < userTyped.length; i++) {
      // Si le caractère ne correspond pas à celui attendu, c'est une erreur
      if (userTyped[i] !== targetText[i]) {
        gameState.nbErreurs++;
      }
    }
    return gameState.nbErreurs;
  }
  
  /**
   * Calcule la précision de la saisie utilisateur.
   * La précision est calculée comme le pourcentage de caractères corrects
   * parmi la saisie totale.
   *
   * @param {string} targetText - Le texte attendu.
   * @param {string} userTyped - Le texte saisi par l'utilisateur.
   * @returns {number} - La précision en pourcentage.
   */
  export function calculerPrecision(targetText, userTyped) {
    // Si l'utilisateur n'a rien tapé, on peut considérer la précision comme 100%
    // (aucune faute n'est commise) ou 0% selon la convention choisie.
    if (userTyped.length === 0) return 100;
  
    gameState.nbErreurs = compterErreurs(targetText, userTyped);
    gameState.nbCorrects = userTyped.length - gameState.nbErreurs;
    // Calcul du pourcentage de caractères corrects
     gameState.precision = (gameState.nbCorrects / userTyped.length) * 100;
    return gameState.precision;
  }
  
  
// Vérifier la saisie de l'utilisateur
export function userBot(targetText) {
  const inputArea = document.querySelector(".text-input");
  const userCar = document.querySelector(".user-car");
  const graphElement = document.querySelector(".graph");
  inputArea.addEventListener("input", () => {
    if (! gameState.startTime)  gameState.startTime = Date.now();
    // const elapsedTime = (Date.now() - startTime) / 60000;
    const userTyped = inputArea.value;

     compterErreurs(targetText, userTyped);
     calculerPrecision(targetText, userTyped);

    if (targetText.startsWith(userTyped)) {
      gameState.userProgress = userTyped.length / targetText.length;
      moveCar(userCar,  gameState.userProgress);
      updateWPMCPMRealtime(userTyped, targetText, "user");

      if (userTyped === targetText) {
        gameState.userFinished = true;
        endGame()
        graphElement.scrollIntoView({ behavior: "smooth" });
        graphElement.style.display = "flex";
      }
    } else {
      inputArea.style.color = "red";
    }
  });

  inputArea.addEventListener("keydown", () => {
    inputArea.style.color = "black"; // Réinitialiser la couleur de l'entrée
  });
}

export function botBot(bot = null, power = null) {
  console.log("🔄 startBot() appelé");
  const botCar = document.querySelector(`.${bot ? bot + "-car" : "bot-car"}`);
  console.log("botcar", botCar);

  const text = gameState.text;
  console.log('textlenght', text)
  const textLength = text.length
  console.log('textlenght of text is',textLength)
  // let botProgress = 0;
  // let startTime = null;

  // Vérifie si un bot et un WPM (puissance) sont fournis
  if ( gameState.custom && bot && power) {
    let botProgress = 0;
    let startTime = null;
    const wpm = parseInt(power, 10); // Vitesse en mots par minute
    const cpm = wpm * 5; // Caractères par minute
    const baseSpeed = wpm / (60 * textLength); // Progression par intervalle basée sur WPM et longueur du texte

    console.log(
      `Bot: ${bot}, WPM: ${wpm}, CPM: ${cpm}, Base Speed: ${baseSpeed}`
    );

    const botInterval = setInterval(() => {
      if (!startTime)  startTime = Date.now(); // Démarre le chronomètre au début

      // Mise à jour de la progression du bot
      botProgress += baseSpeed;
      botProgress = Math.min(botProgress, 1); // Limite la progression à 1 (100%)

      // Déplace la voiture
      moveCar(botCar, botProgress);

      // Met à jour WPM et CPM tant que le bot n'a pas terminé
      if ( botProgress < 1) {
        updateWPMCPM(wpm, cpm, bot);
      }

      // Si le bot atteint la fin
      if ( botProgress >= 1) {
        gameState.carFinished = true;
        endGame()
        botProgress = 1; // Assure que la progression ne dépasse pas 1
        clearInterval( botInterval); // Arrête l'intervalle
        console.log(`Bot "${bot}" a terminé avec ${wpm} WPM !`);
        return;
      }
    }, 100); // Mettre à jour toutes les 100 ms
  } else if (gameState.computer) {
    // Cas par défaut si aucun bot ou power n'est défini
    bot = "bot";
    power = 0;
  
    gameState.botProgress = 0; // Réinitialiser la progression
    gameState.botFinished = false; // Indiquer que le bot n'a pas fini
  
    const textContainer = gameState.text;
    const defaultbaseSpeed = 3;
    // const minSpeed = 0.5;
    const botSpeed = (defaultbaseSpeed + Math.random() * 0.5) / textLength;

    const adjustedSpeed = botSpeed / textLength; // Ajustement de la vitesse en fonction du texte

    const botInterval = setInterval(() => {
      if (! gameState.startTime)  gameState.startTime = Date.now();
      // const elapsedTime = (Date.now() - startTime) / 60000;
      gameState.botProgress += adjustedSpeed;

      const botTypedLength = Math.floor(gameState.botProgress * textContainer.length);
      const botText = textContainer.substring(0, botTypedLength);
 
      console.log("botText", botText);
      console.log("textConntainer", textContainer);
      console.log(
        `Débogage: botProgress=${ gameState.botProgress}, bot=${bot}, textContainer=${textContainer}`
      );

      if ( gameState.botProgress >= 1) {
        gameState.botProgress = 1;
        gameState.botFinished = true;
        endGame()
        // moveCar(botCar,  gameState.botProgress);
        clearInterval(botInterval);
        gameState.botInterval = null;
        return;
      }
      updateWPMCPMRealtime(botText, textContainer, bot);
      moveCar(botCar,  gameState.botProgress);
    }, 16); // Mettre à jour toutes les 50 ms
    gameState.botInterval = botInterval;
  }
}


// Fonction pour mettre à jour les WPM et CPM
function updateWPMCPM(wpm, cpm, player) {
  const wpmElement = document.querySelector(`.${player}-wpm`);
  const cpmElement = document.querySelector(`.${player}-cpm`);
  if (wpmElement && cpmElement) {
    wpmElement.innerHTML = `WPM: ${wpm.toFixed(2)}`;
    cpmElement.innerHTML = `CPM: ${cpm.toFixed(2)}`;
  }
  updateChart(wpm, cpm, player);
}


function updateWPMCPMRealtime(inputText, targetText, player) {
  console.log("🔄 updateWPMCPMRealtime() appelé");

  const elapsedTime = (Date.now() - gameState.startTime) / 60000; // Temps en minutes
  const totalCharacters = inputText.length;

  const wordsArray = inputText.trim().split(/\s+/);
  // const wordsArray = inputText.trim().split(/\s+/); //erreur est ici----------------------------
  const totalwords = wordsArray.length;

  const wpm = totalwords / elapsedTime; // Calcul du WPM
  const cpm = totalCharacters / elapsedTime; // Calcul du CPM
  console.log(wpm);
  updateWPMCPM(wpm, cpm, player); // Mise à jour dans l'UI
  console.log(`Joueur: ${player}, WPM: ${wpm}, CPM: ${cpm}`);
}


export function updateChart(wpm, cpm, player) {
  const elapsedTime = updateDisplay();
  // const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(1);
  const maxDataPoints = 50;
  
  if ((player === "bot" && gameState.botFinished) || (player === "user" && gameState.userFinished)) {
  return; // Stopper la mise à jour une fois la course terminée
}
  // const elapsedTime = raceStats.elapsedTime;
  if (! gameState.timeData.includes(elapsedTime)) {
    gameState.timeData.push(elapsedTime);
    if ( gameState.timeData.length > maxDataPoints) {
      gameState.timeData.shift();
    }
  }

  if (player === "user") {
    if ( gameState.userProgress >= 1) {
      gameState.userFinished = true;
      // L'utilisateur a fini sa course : duplique la dernière valeur
      gameState.userWPMData.push(0);
      gameState.userCPMData.push(0);
    } else {
      // Course en cours : ajoute les nouvelles données  
      gameState.userWPMData.push(wpm);
      gameState.userCPMData.push(cpm);
    }
  } else if (player === "bot") {
    if ( gameState.botProgress >= 1) {
      gameState.botFinished = true;
      gameState.botWPMData.push(0);
      gameState.botCPMData.push(0);
    } else {
      gameState.botWPMData.push(wpm);
      gameState.botCPMData.push(cpm);
    }
  }

  if ( gameState.startChart) {
    gameState.startChart.data.labels = gameState.timeData;
    gameState.startChart.data.datasets[0].data = gameState.userWPMData;
    gameState.startChart.data.datasets[1].data = gameState.userCPMData;
    // gameState.startChart.data.datasets[2].data = botWPMData;
    // gameState.startChart.data.datasets[3].data = botCPMData;
    gameState.startChart.update();
  }
}

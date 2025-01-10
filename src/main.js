import Chart from "chart.js/auto";

const players = [];
console.log("users", players.name);

let userProgress = 0;
let botProgress = 0;
let userScore = 0;
let botScore = 0;
let userFinished = false;
let botFinished = false;

let userWPMData = [];
let userCPMData = [];
let botWPMData = [];
let botCPMData = [];
let timeData = [];
let userErrors = 0;

let startTime; // Le temps de départ
let elapsedTime = 0;
let timerInterval = null; // Référence pour l'intervalle du timer

let milliseconds = 0;
let seconds = 0;
let minutes = 0;

let startTimer = null;
let elapsedTimer = 0;
// let timerInterval = null;
let startChart = null;

const textContainer = [
  "Choose exactly what you want for your next race. You can choose your bots (challengers).",
];

function displayFinalChart() {
  const canvas = document.querySelector(".chart");
  if (!canvas) {
    console.error("Canvas avec la classe 'chart' introuvable !");
    return;
  }

  const ctx = canvas.getContext("2d");

  // Détruire un ancien graphique s'il existe
  if (startChart) {
    startChart.destroy();
  }

  // Calcul de l'échelle maximale pour les axes Y
  const maxWPM = Math.max(...userWPMData, ...botWPMData);
  const maxCPM = Math.max(...userCPMData, ...botCPMData);
  const maxYScale = Math.ceil(Math.max(maxWPM, maxCPM) / 10) * 10; // Arrondi supérieur à la dizaine

  // Création du graphique
  startChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: timeData, // Les données de temps
      datasets: [
        {
          label: "User WPM",
          borderColor: "rgba(0, 123, 255, 1)",
          backgroundColor: "rgba(0, 123, 255, 0.2)",
          data: userWPMData,
          fill: true,
          tension: 0.4,
        },
        {
          label: "User CPM",
          borderColor: "rgba(40, 167, 69, 1)",
          backgroundColor: "rgba(40, 167, 69, 0.2)",
          data: userCPMData,
          fill: true,
          tension: 0.4,
        },
        {
          label: "Bot WPM",
          borderColor: "rgba(255, 193, 7, 1)",
          backgroundColor: "rgba(255, 193, 7, 0.2)",
          data: botWPMData,
          fill: true,
          tension: 0.4,
        },
        {
          label: "Bot CPM",
          borderColor: "rgba(220, 53, 69, 1)",
          backgroundColor: "rgba(220, 53, 69, 0.2)",
          data: botCPMData,
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Temps (secondes)",
          },
        },
        y: {
          title: {
            display: true,
            text: "Vitesse (WPM / CPM)",
          },
          beginAtZero: true,
          max: maxYScale, // Limite de l'échelle Y
        },
      },
      animation: {
        duration: 1000,
        easing: "easeOutCubic",
      },
    },
  });

  console.log("Graphique final affiché :", {
    timeData,
    userWPMData,
    botWPMData,
  });
}

function createUser() {
  const nameInput = document.querySelector(".input-name");
  const wpmInput = document.querySelector(".input-wpm");

  // Récupérez les valeurs des champs d'entrée
  const name = nameInput.value.trim();
  const wpm = parseInt(wpmInput.value.trim(), 10) || 0; // Convertir en nombre (par défaut 0 si invalide)

  if (!name || wpm <= 0) {
    alert("Veuillez entrer un nom valide et une valeur WPM supérieure à 0.");
    return;
  }

  // Créez un joueur
  let player = {
    name: name,
    wpm: wpm,
    cpm: [],
    error: 0,
    precision: 0,
    finished: false,
    carColor: Math.floor(Math.random() * 360), // Exemple de couleur aléatoire (teinte HSL)
  };

  // Ajoutez le joueur au tableau
  players.push(player);
  renderPlayerTrack(player);

  // Réinitialisez les champs d'entrée
  nameInput.value = "";
  wpmInput.value = "";

  console.log("Joueur ajouté :", player);
  console.log("Liste des joueurs :", players);
}

function renderPlayerTrack(player) {
  const raceTracker = document.querySelector(".car-center");
  const container = document.createElement("div");
  container.className = "player-container";

  container.innerHTML = `
    <div class="road">
      <img class="player-car" src="${player.carImage}" alt="Car for ${player.name}" />
      <div class="line"></div>
    </div>
    <div class="flag">
      <span>Finish</span>
      <div class=""></div>
    </div>
  `;
  raceTracker.appendChild(container);
}

function normalRace() {
  const user = document.querySelector(".second-user");
  const container = document.querySelector(".second-container");
  const params = document.querySelector(".second-params");
  user.innerHTML = "";
  container.innerHTML = "";
  params.innerHTML = "";
}

function manageUser() {
  const normal = document.querySelector(".normal");
  const custom = document.querySelector(".custom");
  const comput = document.querySelector(".computer");
  const items = document.querySelector(".addItems");
  const add = document.querySelector(".add-section");
  const added = document.querySelector(".added");

  normal.addEventListener("click", () => {
    normalRace();
  });

  custom.addEventListener("click", () => {
    const addsection = document.querySelector(".select-area");
    addsection.style.display = "block";
  });

  comput.addEventListener("click", () => {
    const center = document.querySelector(".car-center");
    center.style.display = "block";
  });
  items.addEventListener("click", () => {
    add.style.display = "block";
  });
  added.addEventListener("click", () => {
    createUser();
    alert("enregistre avec succes");
  });
}

// Initialiser les lignes sur la piste
function initializeRoadLines() {
  const lineCounters = document.querySelectorAll(".line");
  lineCounters.forEach((lineCounter) => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 40; i++) {
      const div = document.createElement("div");
      div.style.height = "4px";
      fragment.appendChild(div);
    }

    lineCounter.appendChild(fragment);
  });
}

// Afficher le texte d'introduction
function displayText() {
  const textElement = document.querySelector(".full");
  const text = textContainer[0];
  text.split("").forEach((char) => {
    const span = document.createElement("span");

    if (char === " ") {
      span.style.marginRight = "8px"; // Ajustez la taille de la marge si nécessaire
    }
    span.textContent = char;
    span.style.fontSize = "14px";
    span.style.fontFamily = "Roboto";
    textElement.appendChild(span);
  });
}

function check() {
  const inputText = document.querySelector(".text-input").value; // Texte saisi par l'utilisateur
  const textElement = document.querySelector(".full");
  const spans = textElement.getElementsByTagName("span"); // Les <span> du texte cible

  // Parcourt le texte cible caractère par caractère
  for (let i = 0; i < textContainer[0].length; i++) {
    if (spans[i]) {
      if (i < inputText.length) {
        // Vérifie si le caractère saisi correspond au caractère cible
        if (inputText[i] === textContainer[0][i]) {
          spans[i].className = "correct"; // Correct
        } else {
          spans[i].className = "incorrect"; // Incorrect
        }
      } else {
        spans[i].className = ""; // Pas encore saisi
      }
    }
  }
}

// Réinitialiser les paramètres du jeu
function resetGame() {
  const userCar = document.querySelector(".user-car");
  const botCar = document.querySelector(".bot-car");
  const inputArea = document.querySelector(".text-input");

  clearInterval(timerInterval);
  startTime = null;

  userProgress = 0;
  botProgress = 0;

  userWPMData = [];
  userCPMData = [];
  botWPMData = [];
  botCPMData = [];
  timeData = [];

  if (startChart) {
    startChart.destroy();
    startChart = null;
  }

  userCar.style.transform = "translateX(0)";
  botCar.style.transform = "translateX(0)";
  inputArea.value = "";
}

// function chekFinished(progress, player) {
//   if (progress >= 1) {
//     if (player === "user" && !userFinished) {
//       userFinished = true;
//       console.log("User a terminé la course !");
//     } else if (player === "bot" && !botFinished) {
//       botFinished = true;
//       console.log("Bot a terminé la course !");
//     }
//   }
// }

function moveCar(car, progress) {
  const trackWidth = document.querySelector("#race-track").offsetWidth;
  const carWidth = car.offsetWidth;
  const maxPosition = trackWidth - carWidth;
  const position = progress * maxPosition;
  car.style.transform = `translateX(${position}px)`;
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
  const elapsedTime = (Date.now() - startTime) / 60000; // Temps en minutes
  const totalCharacters = inputText.length;

  const wordsArray = inputText.trim().split(/\s+/); //erreur est ici----------------------------
  const totalwords = wordsArray.length;

  const wpm = totalwords / elapsedTime; // Calcul du WPM
  const cpm = totalCharacters / elapsedTime; // Calcul du CPM

  updateWPMCPM(wpm, cpm, player); // Mise à jour dans l'UI
  // updateChart(wpm, cpm, player); // Stocker pour le graphique
}

// Mettre à jour le graphique
function updateChart(wpm, cpm, player) {
  const elapsedTime = updateDisplay();
  // const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(1);
  const maxDataPoints = 50;
  // const elapsedTime = raceStats.elapsedTime;
  if (!timeData.includes(elapsedTime)) {
    timeData.push(elapsedTime);
    if (timeData.length > maxDataPoints) {
      timeData.shift();
    }
  }

  // if (!userFinished) {
  //   const userWPM = Math.random() * 100; // Simulation de données
  //   const userCPM = userWPM * 5; // Exemple de calcul
  //   userWPMData.push(userWPM);
  //   userCPMData.push(userCPM);
  // }

  // if (!botFinished) {
  //   const botWPM = Math.random() * 100; // Simulation de données
  //   const botCPM = botWPM * 5;
  //   botWPMData.push(botWPM);
  //   botCPMData.push(botCPM);
  // }

  if (player === "user") {
    if (userProgress >= 1) {
      userFinished = true;
      // L'utilisateur a fini sa course : duplique la dernière valeur
      userWPMData.push(0);
      userCPMData.push(0);
    } else {
      // Course en cours : ajoute les nouvelles données
      userWPMData.push(wpm);
      userCPMData.push(cpm);
    }
  } else if (player === "bot") {
    if (botProgress >= 1) {
      botFinished = true;
      botWPMData.push(0);
      botCPMData.push(0);
    } else {
      botWPMData.push(wpm);
      botCPMData.push(cpm);
    }
  }

  // if (player === "user") {
  //   userWPMData.push(wpm);
  //   userCPMData.push(cpm);
  //   if (userWPMData.length > maxDataPoints) {
  //     userWPMData.shift();
  //     userCPMData.shift();
  //   }
  // } else if (player === "bot") {
  //   botWPMData.push(wpm);
  //   botCPMData.push(cpm);
  //   if (botWPMData.length > maxDataPoints) {
  //     botWPMData.shift();
  //     botCPMData.shift();
  //   }
  // }

  if (startChart) {
    startChart.data.labels = timeData;
    startChart.data.datasets[0].data = userWPMData;
    startChart.data.datasets[1].data = userCPMData;
    startChart.data.datasets[2].data = botWPMData;
    startChart.data.datasets[3].data = botCPMData;
    startChart.update();
  }
  console.log("Chart updated:", { timeData, userWPMData, botWPMData });
}
// Compter les fautes
function countErrors(userInput, targetText) {
  let errors = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] !== targetText[i]) {
      errors++;
    }
  }
  userErrors = errors;
  return errors;
}

// Calculer la précision en %
function calculateAccuracy(userInput, targetText) {
  const errors = countErrors(userInput, targetText);
  const totalCharacters = userInput.length;
  if (totalCharacters === 0) return 0;
  let accuracy = ((totalCharacters - errors) / totalCharacters) * 100;

  return accuracy;
}

// Vérifier la saisie de l'utilisateur
function verifyInput() {
  const inputArea = document.querySelector(".text-input");
  const targetText = textContainer[0];
  const userCar = document.querySelector(".user-car");

  inputArea.addEventListener("input", () => {
    if (!startTime) startTime = Date.now();
    // const elapsedTime = (Date.now() - startTime) / 60000;
    const userTyped = inputArea.value;

    if (targetText.startsWith(userTyped)) {
      userProgress = userTyped.length / targetText.length;
      moveCar(userCar, userProgress);

      // const raceInterval = setInterval(() => {
      //   if (userFinished && botFinished) {
      //     clearInterval(raceInterval);
      //     console.log("Course terminée !");
      //     return;
      //   }
      // });
      updateWPMCPMRealtime(userTyped, targetText, "user");

      if (userTyped === targetText) {
        endGame("win");
      }
    } else {
      inputArea.style.color = "red";
    }
  });

  inputArea.addEventListener("keydown", () => {
    inputArea.style.color = "black"; // Réinitialiser la couleur de l'entrée
  });
}

// Mouvement automatique du robot
function startBot() {
  const botCar = document.querySelector(".bot-car");
  const textLength = textContainer[0].length;

  const baseSpeed = 8;
  // const minSpeed = 0.5;
  const botSpeed = (baseSpeed + Math.random() * 0.5) / textLength;

  const adjustedSpeed = botSpeed / textLength; // Ajustement de la vitesse en fonction du texte

  const botInterval = setInterval(() => {
    if (!startTime) startTime = Date.now();
    // const elapsedTime = (Date.now() - startTime) / 60000;
    botProgress += adjustedSpeed;

    const botTypedLength = Math.floor(botProgress * textContainer[0].length);
    const botText = textContainer[0].substring(0, botTypedLength);
    updateWPMCPMRealtime(botText, textContainer[0], "bot");

    if (botProgress >= 1) {
      botProgress = 1;
      moveCar(botCar, botProgress);
      // requestAnimationFrame(startBot)
      clearInterval(botInterval);
      endGame("lose");
    }
    // const raceInterval = setInterval(() => {
    //   if (userFinished && botFinished) {
    //     clearInterval(raceInterval);
    //     console.log("Course terminée !");
    //     return;
    //   }
    // });

    // if (!botFinished) {
    //   botProgress += Math.random() * 0.02;
    //   moveCar(botCar, botProgress, "bot");
    // }

    moveCar(botCar, botProgress);
  }, 16); // Mettre à jour toutes les 50 ms
}

// Gérer la fin de partie
function endGame(result) {
  // const inputArea = document.querySelector(".text-input");
  if (result === "win") {
    userScore++;
    alert("Bravo ! Vous avez gagné !");
    stopTimer();
  } else if (result === "lose") {
    botScore++;
    alert("Dommage ! Le robot a gagné.");
  }
  // resetGame();
  displayFinalChart();
}

// Afficher les scores
function displayScores() {
  const scoreElement = document.querySelector(".graph .performance span");
  scoreElement.textContent = `Utilisateur: ${userScore} | Robot: ${botScore}`;
}

// Initialiser le jeu
function startGame() {
  resetGame();
  resetTimer();
  verifyInput();
  startBot();
}

function toStart() {
  const start = document.querySelector(".starter");
  start.addEventListener("click", () => {
    const count = document.querySelector(".counter");
    count.style.display = "block";
    startCountdown();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  toStart();
  initializeRoadLines();
  displayText();
  manageUser();
});

function callTostartGame() {
  displayScores();
  startGame();
  startTimerFunction();

  const textInput = document.querySelector(".text-input");
  textInput.addEventListener("input", check);
}

async function callTostart() {
  const togo = document.querySelector(".togo");
  togo.innerHTML = "Let's Go ...";
  togo.style.display = "block";
  await new Promise((resolve) => setTimeout(resolve, 1000));
  togo.innerHTML = "";
  togo.style.display = "none";

  // startTimerFunction();
  callTostartGame();
}

function startCountdown() {
  const count = document.querySelector(".counter");
  let counter = 3;
  const interval = setInterval(() => {
    count.textContent = counter;
    if (counter === 0) {
      clearInterval(interval);
      count.style.display = "none";
      callTostart();
    }
    counter--;
  }, 1000);
}

function updateTimer() {
  milliseconds += 100; // On incrémente par 10 ms

  if (milliseconds >= 1000) {
    milliseconds = 0;
    seconds++; // Incrémenter les secondes

    if (seconds >= 60) {
      seconds = 0;
      minutes++; // Incrémenter les minutes
    }
  }

  updateDisplay();
}

function updateDisplay() {
  const display = document.querySelector(".time");
  display.innerHTML = "";
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
  display.textContent = formattedTime;
  console.log("time", formattedTime);
  return formattedTime;
}
console.log("function chrono", updateDisplay());

function startTimerFunction() {
  if (!timerInterval) {
    startTimer = Date.now() + elapsedTimer;
    timerInterval = setInterval(() => {
      elapsedTime++;
      updateTimer();
    }, 100);
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  // elapsedTimer += Date.now() - startTimer;
}

function resetTimer() {
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  elapsedTimer = 0;
  updateDisplay();
}

// function createElement() {
//   const user = document.querySelector(".second-user");
//   const container = document.querySelector(".second-container");
//   const params = document.querySelector(".second-params");
//   for (let i = 0; i < 3; i++) {
//     const div = document.createElement(div);
//     div[i].textContent = "salut";
//     user.appendChild(div[i]);
//   }
// }

// createElement();

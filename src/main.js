import Chart from "chart.js/auto";

const namesContainer = ["jacques", "firmain", "sam", "paul"];
const powerContainer = [
  "80 wpm",
  "70 wpm",
  "60 wpm",
  "50 wpm",
  "40 wpm",
  "30 wpm",
  "20 wpm",
  "10 wpm",
];

const carsConainer = ["car0", "car1", "car2", "car3", "car6"];

let bots = {};
let botElement = null;

let normal = false;
let custom = false;
let computer = false;
let botCreated = false;

let selectedName = null;
let selectedPower = null;
console.log("selectedName");
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

function createUser() {
  const nameInput = document.querySelector(".input-name");
  const wpmInput = document.querySelector(".input-wpm");
  const addSec = document.querySelector(".add-section");
  // Récupérez les valeurs des champs d'entrée
  const name = nameInput.value.trim();
  // const wpm = parseInt(wpmInput.value.trim(), 10) || 0; // Convertir en nombre (par défaut 0 si invalide)
  const wpm = wpmInput.value.trim();
  if (!name || wpm <= 0) {
    alert("Veuillez entrer un nom valide et une valeur WPM supérieure à 0.");
    return;
  }

  namesContainer.push(name);
  powerContainer.push(wpm);

  addSec.style.display = "none";

  nameInput.value = "";
  wpmInput.value = "";

  console.log("Joueur ajouté :", name);
  console.log("power:", wpm);
  console.log(
    "liste de joueur et liste des power",
    namesContainer,
    powerContainer
  );
}

// function useSelectBot(selectedBot) {
//   botElement = selectedBot;
//   console.log(selectedBot);
// }

function displayUser(container, user, element, onSelect) {
  // Vérifier si les arguments sont valides
  if (!Array.isArray(container) || !user || !element) {
    console.error(
      "Invalid arguments: 'container' should be an array and 'user' should be a valid DOM element."
    );
    return;
  }

  // Parcourir les éléments du conteneur
  for (let item of container) {
    // Créer un élément <span>
    let span = document.createElement("span");

    // Ajouter le contenu textuel à <span>
    span.textContent = item;
    span.addEventListener("click", () => {
      element.textContent = item;
      user.style.display = "none";
      onSelect(item);
    });

    // Ajouter <span> comme enfant de l'élément utilisateur
    user.appendChild(span);
  }
}

function resetElement(domelement, names) {
  const remove = document.querySelector(".remove-element");
  remove.addEventListener("click", () => {
    if (domelement) {
      domelement.innerHTML = names;
    }
  });
}

function select() {
  const names = document.querySelector(".select-name");
  const powers = document.querySelector(".select-power");

  const otherN = document.querySelector(".other-names");
  const otherW = document.querySelector(".other-power");

  names.addEventListener("click", () => {
    if (otherN.style.display === "none") {
      otherN.innerHTML = "";
      displayUser(namesContainer, otherN, names, (selectedBot) => {
        selectedName = selectedBot;
      });
      resetElement(names, "name");
      otherN.style.display = "flex";
    } else {
      otherN.style.display = "none";
    }
  });

  powers.addEventListener("click", () => {
    if (otherW.style.display === "none") {
      otherW.innerHTML = "";
      displayUser(powerContainer, otherW, powers, (selectedBot) => {
        selectedPower = selectedBot;
      });
      resetElement(powers, "power");

      otherW.style.display = "flex";
    } else {
      otherW.style.display = "none";
    }
  });
}

function renderPlayerTrack() {
   let botName;

  // Assigner la valeur de `botName` selon la condition
  if (custom) {
    botName = selectedName;
  } else {
    botName = "bot";
  }
  console.log("name", botName);
  if (custom && selectedName) {
    botName = selectedName;
  }
  const raceTracker = document.querySelector(".race");
  // Crée la section des utilisateurs
  const userLeft = document.createElement("div");
  userLeft.className = "user-left";

  const firstUser = document.createElement("div");
  firstUser.className = "user";

  const firstUserText = document.createElement("p");
  firstUserText.textContent = botName;
  firstUser.appendChild(firstUserText);

  userLeft.appendChild(firstUser);
  // userLeft.appendChild(secondUser);

  // Crée la section des voitures et de la route
  const carCenter = document.createElement("div");
  carCenter.className = "car-center";

  const firstContainer = document.createElement("div");
  firstContainer.className = " first-container";

  const roadFirst = document.createElement("div");
  roadFirst.className = "road";
  const userCar = document.createElement("img");
  userCar.className = `${botName}-car`;
  userCar.src = "/car.svg";
  userCar.alt = "Car for user";
  const lineFirst = document.createElement("div");
  lineFirst.className = "line";
  roadFirst.appendChild(userCar);
  roadFirst.appendChild(lineFirst);

  const flagFirst = document.createElement("div");
  flagFirst.className = "flag";
  const finishFirst = document.createElement("span");
  finishFirst.textContent = "Finish";
  flagFirst.appendChild(finishFirst);

  firstContainer.appendChild(roadFirst);
  firstContainer.appendChild(flagFirst);

  carCenter.appendChild(firstContainer);
  // carCenter.appendChild(secondContainer);

  // Crée la section des paramètres
  const paramsRight = document.createElement("div");
  paramsRight.className = "params-right";

  const firstParams = document.createElement("div");
  firstParams.className = "params";
  const userWpm = document.createElement("p");
  userWpm.className = "bot-wpm";
  userWpm.textContent = "0: wpm";
  const userCpm = document.createElement("p");
  userCpm.className = "bot-cpm";
  userCpm.textContent = "0: cpm";
  firstParams.appendChild(userWpm);
  firstParams.appendChild(userCpm);

  paramsRight.appendChild(firstParams);
  // paramsRight.appendChild(secondParams);

  // Ajouter tous les éléments à la structure principale de la course
  raceTracker.appendChild(userLeft);
  raceTracker.appendChild(carCenter);
  raceTracker.appendChild(paramsRight);
  initializeRoadLines();
  // Ajouter l'élément container à l'élément du DOM qui doit contenir la course
  // raceTracker.appendChild(container); // Vous pouvez remplacer "document.body" par un autre élément de votre choix.
}

// Appel de la fonction pour générer la course

function addPlayer() {
  const name = document.querySelector(".select-name").value;
  const powers = document.querySelector(".select-power").value;
  const custom = document.querySelector(".add-section");

  if (!name || !powers) {
    return;
  }

  bots[name] = { name, powers };
  custom.style.display = "none";
}

function manageUser() {
  const normal = document.querySelector(".normal");
  const custom = document.querySelector(".custom");
  const comput = document.querySelector(".computer");
  const items = document.querySelector(".addItems");
  const add = document.querySelector(".add-section");
  const added = document.querySelector(".added");
  const player = document.querySelector(".start");
  const addsection = document.querySelector(".select-area");

  normal.addEventListener("click", () => {
    normalRace();
  });

  custom.addEventListener("click", () => {
    if (addsection.style.display === "none") {
      addsection.style.display = "block";
    } else {
      addsection.style.display = "none";
    }
  });

  comput.addEventListener("click", () => {
    computerRace();
  });

  items.addEventListener("click", () => {
    if (add.style.display === "none") {
      add.style.display = "block";
    } else {
      add.style.display = "none";
    }
  });

  added.addEventListener("click", () => {
    createUser();
    alert("enregistre avec succes");
  });

  player.addEventListener("click", () => {
    customRace();
    addsection.style.display = "none";
  });
}

function normalRace() {
  resetGame();
  normal = true;
  custom = false;
  computer = false;
  console.log("normal is click", normal);
  return normal;
}

function customRace() {
  normal = false;
  custom = true;
  computer = false;
  resetGame();
  renderPlayerTrack(true, selectedName);
  console.log("custom is clicked");
  console.log("custom = ", custom);
  return custom;
}

function computerRace() {
  normal = false;
  custom = false;
  computer = true;
  if (!botCreated) {
    resetGame();
    renderPlayerTrack();

    botCreated = true;
  }

  return computer;
}

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
  const inputArea = document.querySelector(".text-input");
  if (normal) {
    clearInterval(timerInterval);
    startTime = null;

    userProgress = 0;
    userWPMData = [];
    userCPMData = [];

    if (startChart) {
      startChart.destroy();
      startChart = null;
    }

    userCar.style.transform = "translateX(0)";
  } else if (custom && computer && botCreated) {
    const botCar = document.querySelector(".bot-car");

    clearInterval(timerInterval);
    startTime = null;
    botCreated = false;

    userProgress = 0;
    userWPMData = [];
    userCPMData = [];

    botProgress = 0;
    botWPMData = [];
    botCPMData = [];

    if (startChart) {
      startChart.destroy();
      startChart = null;
    }

    userCar.style.transform = "translateX(0)";
    botCar.style.transform = "translateX(0)";
  }
  timeData = [];
  inputArea.value = "";
}

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

  const wpm = Math.round(totalwords / elapsedTime); // Calcul du WPM
  const cpm = Math.round(totalCharacters / elapsedTime); // Calcul du CPM

  updateWPMCPM(wpm, cpm, player); // Mise à jour dans l'UI
  console.log(`Joueur: ${player}, WPM: ${wpm}, CPM: ${cpm}`);
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
function startBot(bot = null, power = null) {
  const botCar = document.querySelector(".bot-car");
  const textLength = textContainer[0].length;
  let baseSpeed;

  if (bot && power) {
    let wpm = parseInt(power, 10);
    console.log("wpm", wpm);

    let cpm = wpm * 5;

    baseSpeed = wpm / 60;
    const botinterval = setInterval(() => {
      if (!startTime) startTime = Date.now();
      botProgress += baseSpeed / 100;
      if (botProgress > 1) botProgress = 1;
      console.log("botprogresse", botProgress);
      moveCar(bot, botProgress);
      if (botProgress >= 1) {
        clearInterval(botinterval);
        console.log(`Bot avec ${bot.wpm} WPM a terminé !`);
      }
    }, 100);
    updateWPMCPM(wpm, cpm, bot);
  }

  baseSpeed = 3;
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

// // Initialiser le jeu
// function startGame() {
//   resetGame();
//   resetTimer();

//   if (computer && botCreated) {
//     startBot();
//     verifyInput();
//   } else if (custom) {
//     let bot;
//     let wpm;
//     console.log("botname = ", bot);
//     console.log("power = ", wpm);

//     if (botNames) {
//       return (bot = botElement);
//     } else if (botPowers) {
//       return (wpm = parseInt(botElement, 10));
//     }
//     verifyInput();
//     startBot(bot, wpm);
//   } else {
//     verifyInput();
//   }
// }
function startGame() {
  // Réinitialiser le jeu et le minuteur
  resetGame();
  resetTimer();

  if (computer && botCreated) {
    // Lancer le bot et vérifier l'entrée pour le mode ordinateur
    verifyInput();
    startBot();
    // renderPlayerTrack();
  } else if (custom) {
    // Gestion des bots personnalisés
    let bot = selectedName;
    let power = selectedPower;

    console.log("botname =", bot);
    console.log("power =", power);

    verifyInput();
    startBot(bot, power);
  }

  // Mode par défaut : vérifier uniquement l'entrée
  verifyInput();
}

function toStart() {
  const start = document.querySelector(".starter");
  start.addEventListener("click", () => {
    const count = document.querySelector(".counter");
    count.style.display = "block";
    startCountdown();
  });
}

function initializeGame() {
  toStart();
  initializeRoadLines();
  displayText();
  manageUser();
  select();
  addPlayer();
}
document.addEventListener("DOMContentLoaded", () => {
  initializeGame();
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

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

let bots = [];
let botElement = null;

let normal = false;
let custom = false;
let computer = false;
let botCreated = false;
let botCount = 0;

let selectedName = null;
let selectedPower = null;

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

  // Fonction pour gérer l'affichage et la sélection des options
  const toggleDisplay = (element, container, input, callback) => {
    if (element.style.display === "none") {
      element.innerHTML = ""; // Vider l'élément avant d'afficher
      displayUser(container, element, input, (selectedBot) => {
        callback(selectedBot); // Mettre à jour le nom ou la puissance sélectionnée
      });
      resetElement(
        input,
        element.classList.contains("select-name") ? "name" : "power"
      );
      element.style.display = "flex"; // Afficher l'élément
    } else {
      element.style.display = "none"; // Cacher l'élément si déjà visible
    }
  };

  // Gestion du clic sur le nom
  names.addEventListener("click", () => {
    toggleDisplay(otherN, namesContainer, names, (selectedBot) => {
      selectedName = selectedBot; // Mettre à jour le nom du bot sélectionné
    });
  });

  // Gestion du clic sur la puissance
  powers.addEventListener("click", () => {
    toggleDisplay(otherW, powerContainer, powers, (selectedBot) => {
      selectedPower = selectedBot; // Mettre à jour la puissance du bot sélectionné
    });
  });
}

function renderPlayerTrack(selectName) {
  const defaultBotName = "bot";
  let botName = selectName || defaultBotName;
  console.log("Selected bot name:", botName);

  const raceTracker = document.querySelector(".race");
  raceTracker.id = "userRace";

  // Crée la section des utilisateurs
  const userLeft = document.createElement("div");
  userLeft.className = `user-left ${botName}`;
  userLeft.id = "userNames";
  userLeft.setAttribute("data-bot-name", botName); // Ajouter un attribut unique pour identifier ce bot

  const firstUser = document.createElement("div");
  firstUser.className = "user";

  const firstUserText = document.createElement("p");
  firstUserText.textContent = botName;
  firstUser.appendChild(firstUserText);

  userLeft.appendChild(firstUser);

  // Crée la section des voitures et de la route
  const carCenter = document.createElement("div");
  carCenter.className = "car-center";
  carCenter.id = "cars";

  const firstContainer = document.createElement("div");
  firstContainer.className = "first-container";

  const roadFirst = document.createElement("div");
  roadFirst.className = "road";
  const userCar = document.createElement("img");
  userCar.className = `${botName}-car`;
  userCar.id = "robot-car";
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

  // Crée la section des paramètres
  const paramsRight = document.createElement("div");
  paramsRight.className = "params-right";
  paramsRight.id = "userParams";

  const firstParams = document.createElement("div");
  firstParams.className = "params";
  const userWpm = document.createElement("p");
  userWpm.className = `${botName}-wpm`;
  userWpm.textContent = "wpm:0";
  const userCpm = document.createElement("p");
  userCpm.className = `${botName}-cpm`;
  userCpm.textContent = "cpm:0";
  firstParams.appendChild(userWpm);
  firstParams.appendChild(userCpm);
  console.log("Bot name is", botName);
  paramsRight.appendChild(firstParams);

  // Ajouter tous les éléments à la structure principale de la course
  raceTracker.appendChild(userLeft);
  raceTracker.appendChild(carCenter);
  raceTracker.appendChild(paramsRight);

  initializeRoadLines();
}

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
    // Enregistrer le bot et afficher un message de confirmation
    createUser();
    alert("Bot enregistré avec succès !");
  });

  player.addEventListener("click", () => {
    customRace(); // Ajouter le bot

    // Afficher tous les bots créés

    // Cacher la section d'ajout
    addsection.style.display = "none";

    // Réinitialiser la sélection après l'ajout
    selectedName = ""; // Réinitialiser le nom du bot
    selectedPower = ""; // Réinitialiser la puissance du bot
  });
}

function clearRaceContainer() {
  // const raceTracker = document.querySelector("#userRace");
  const trackerName = document.querySelector("#userNames");
  const trackerCar = document.querySelector("#cars");
  const trackerParams = document.querySelector("#userParams");

  if (trackerName && trackerCar && trackerParams) {
    trackerName.style.display = "none";
    trackerCar.style.display = "none";
    trackerParams.style.display = "none";
    // raceTracker.innerHTML = ""; // Vide le conteneur

    console.log("Conteneur de course réinitialisé.");
  }

  // if (raceTracker) {
  //   raceTracker.innerHTML = "";
  // }
  bots = []; // Réinitialise la liste des bots
  // botCreated = false; // Réinitialise l'état du bot
  botCount = 0; // Réinitialise le compteur de bots
}

function normalRace() {
  if (normal) {
    // Si le mode "normal" est déjà actif, ne rien faire
    console.log("Mode normal déjà actif, aucune action effectuée.");
    return;
  }

  // Passer en mode "normal"
  resetGame();
  normal = true;
  custom = false;
  computer = false;

  clearRaceContainer();
  console.log("Mode normal activé.");
  return normal;
}

function customRace() {
  if (custom) {
    // Si le mode "custom" est déjà actif, ne rien faire
    console.log("Mode custom déjà actif, aucune action effectuée.");
    return;
  }

  // Passer en mode "custom"
  resetGame();
  normal = false;
  custom = true;
  computer = false;

  clearRaceContainer();

  // Vérification si le bot existe déjà dans la liste des bots
  const botExists = bots.some(
    (bot) => bot.name === selectedName && bot.power === selectedPower
  );

  if (botExists) {
    console.log("Ce bot a déjà été ajouté.");
    return; // Si le bot existe déjà, ne rien faire
  } else {
    bots.push({ name: selectedName, power: selectedPower });
    console.log("Bot ajouté :", bots);
    createdBot();
    botCount++;
    console.log("Bot ajouté : ", selectedName, "Puissance : ", selectedPower);
  }

  console.log("Mode custom activé.");
  return custom;
}

function createdBot() {
  const raceTracker = document.querySelector(".race");
  if (custom) {
    bots.forEach((bot) => {
      const existingBot = raceTracker.querySelector(
        `[data-bot-name="${bot.name}"]`
      );

      if (!existingBot) {
        renderPlayerTrack(bot.name); // Afficher la piste du bot
      } else {
        console.log(`Bot ${bot.name} déjà présent dans la course.`);
      }
    });
  } else {
    return;
  }
}

function computerRace() {
  if (computer) {
    // Si le mode "computer" est déjà actif, ne rien faire
    console.log("Mode computer déjà actif, aucune action effectuée.");
    return;
  }

  // Passer en mode "computer"
  resetGame();
  normal = false;
  custom = false;
  computer = true;

  clearRaceContainer();

  if (!botCreated) {
    renderPlayerTrack();
    botCreated = true;
  }

  console.log("Mode computer activé.");
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
    timeData = [];
    inputArea.value = "";

    if (startChart) {
      startChart.destroy();
      startChart = null;
    }

    userCar.style.transform = "translateX(0)";
  } else if (custom && computer && botCreated) {
    const botCar = document.querySelector("#robot-car");
    bots = [];

    clearInterval(timerInterval);
    startTime = null;
    botCreated = false;

    userProgress = 0;
    userWPMData = [];
    userCPMData = [];

    botProgress = 0;
    botWPMData = [];
    botCPMData = [];
    timeData = [];
    inputArea.value = "";

    if (startChart) {
      startChart.destroy();
      startChart = null;
    }

    // botCar.style.transform = "translateX(0)";
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

  const wordsArray = inputText.trim().split(/\s+/);
  // const wordsArray = inputText.trim().split(/\s+/); //erreur est ici----------------------------
  const totalwords = wordsArray.length;

  const wpm = totalwords / elapsedTime; // Calcul du WPM
  const cpm = totalCharacters / elapsedTime; // Calcul du CPM
  console.log(wpm);
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

// Vérifier la saisie de l'utilisateur
function verifyInput() {
  const inputArea = document.querySelector(".text-input");
  const targetText = textContainer[0];
  const userCar = document.querySelector(".user-car");
  const graphElement = document.querySelector(".graph");
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

function startBot(bot = null, power = null) {
  const botCar = document.querySelector(`.${bot ? bot + "-car" : "bot-car"}`);
  console.log("botcar", botCar);

  const textLength = textContainer[0].length;
  // let botProgress = 0;
  // let startTime = null;

  // Vérifie si un bot et un WPM (puissance) sont fournis
  if (custom && bot && power) {
    let botProgress = 0;
    let startTime = null;
    const wpm = parseInt(power, 10); // Vitesse en mots par minute
    const cpm = wpm * 5; // Caractères par minute
    const baseSpeed = wpm / (60 * textLength); // Progression par intervalle basée sur WPM et longueur du texte

    console.log(
      `Bot: ${bot}, WPM: ${wpm}, CPM: ${cpm}, Base Speed: ${baseSpeed}`
    );

    const botInterval = setInterval(() => {
      if (!startTime) startTime = Date.now(); // Démarre le chronomètre au début

      // Mise à jour de la progression du bot
      botProgress += baseSpeed;
      botProgress = Math.min(botProgress, 1); // Limite la progression à 1 (100%)

      // Déplace la voiture
      moveCar(botCar, botProgress);

      // Met à jour WPM et CPM tant que le bot n'a pas terminé
      if (botProgress < 1) {
        updateWPMCPM(wpm, cpm, bot);
      }

      // Si le bot atteint la fin
      if (botProgress >= 1) {
        botProgress = 1; // Assure que la progression ne dépasse pas 1
        clearInterval(botInterval); // Arrête l'intervalle
        console.log(`Bot "${bot}" a terminé avec ${wpm} WPM !`);
      }
    }, 100); // Mettre à jour toutes les 100 ms
  } else if (computer) {
    // Cas par défaut si aucun bot ou power n'est défini
    bot = "bot";
    power = 0;
    const defaultbaseSpeed = 3;
    // const minSpeed = 0.5;
    const botSpeed = (defaultbaseSpeed + Math.random() * 0.5) / textLength;

    const adjustedSpeed = botSpeed / textLength; // Ajustement de la vitesse en fonction du texte

    const botInterval = setInterval(() => {
      if (!startTime) startTime = Date.now();
      // const elapsedTime = (Date.now() - startTime) / 60000;
      botProgress += adjustedSpeed;

      const botTypedLength = Math.floor(botProgress * textContainer[0].length);
      const botText = textContainer[0].substring(0, botTypedLength);

      updateWPMCPMRealtime(botText, textContainer[0], bot);
      console.log("botText", botText);
      console.log("textConntainer", textContainer);
      console.log(
        `Débogage: botProgress=${botProgress}, bot=${bot}, textContainer=${textContainer}`
      );

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
}

// Gérer la fin de partie
function endGame(result) {
  // const inputArea = document.querySelector(".text-input");
  if (result === "win") {
    userScore++;
    // alert("Bravo ! Vous avez gagné !");
    stopTimer();
  } else if (result === "lose") {
    botScore++;
    // alert("Dommage ! Le robot a gagné.");
  }
  // resetGame();
  displayFinalChart();
  gameResult();
}

// Afficher les scores
function displayScores() {
  const scoreElement = document.querySelector(".graph .performance span");
  scoreElement.textContent = `Utilisateur: ${userScore} | Robot: ${botScore}`;
}

function startGame() {
  // Réinitialiser le jeu et le minuteur

  if (computer && botCreated) {
    resetGame();
    resetTimer();
    verifyInput();
    startBot();
  } else if (custom) {
    verifyInput();
    bots.forEach((bot) => {
      startBot(bot.name, bot.power);
    });

    verifyInput();
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

function toStartGame() {
  const mainArea = document.querySelector(".main-area");
  const submit = document.querySelector(".startButton");
  const openToStart = document.querySelector(".tostart");

  submit.addEventListener("click", () => {
    mainArea.style.display = "flex";
    openToStart.style.display = "none";
    initializeGame();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  toStartGame();
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
// function calculateAccuracy(userInput, targetText) {
//   if (userInput.length === 0) return 0;
//   let correctChars = 0;
//   for (let i = 0; i < userInput.length; i++) {
//     if (userInput[i] === targetText[i]) {
//       correctChars++;
//     }
//   }
//   return ((correctChars / targetText.length) * 100).toFixed(2); // En pourcentage
// }
// Calculer la précision en %
function calculateAccuracy(userInput, targetText) {
  const errors = countErrors(userInput, targetText);
  const totalCharacters = userInput.length;
  if (totalCharacters === 0) return 0;
  let accuracy = ((totalCharacters - errors) / totalCharacters) * 100;

  return accuracy;
}

function gameResult() {
  const inputArea = document.querySelector(".text-input");
  const targetText = textContainer[0];
  // document.querySelector(".text-container")
  // .textContent.trim(); // Correction
  const words = targetText.split(/\s+/);

  inputArea.addEventListener("input", () => {
    if (!startTime) startTime = Date.now();
    const userTyped = inputArea.value;

    countErrors(userTyped, targetText);

    const userWPM = Math.max(Math.floor(...userWPMData), 0); // Meilleur score WPM
    const userCPM = Math.max(Math.floor(...userCPMData), 0); // Meilleur score CPM
    const timeElapsed = timeData[-1];
    const accuracy = calculateAccuracy(userTyped, targetText);
    const errorCount = userErrors;

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

    updateResultElement("wpm", `WPM: ${userWPM}`);
    updateResultElement("cpm", `CPM: ${userCPM}`);
    updateResultElement("time-data", `Time: ${timeElapsed}s`);
    updateResultElement("accuracy-data", `Accuracy: ${accuracy}%`);
    updateResultElement("error-data", `Errors: ${errorCount}`);
    updateResultElement("word-data", `Words: ${words.length}`);
  });
}

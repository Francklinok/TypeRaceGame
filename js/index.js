// import Chart from "chart.js/auto";

let userProgress = 0;
let botProgress = 0;
let userScore = 0;
let botScore = 0;

let userWPMData = [];
let userCPMData = [];
let botWPMData = [];
let botCPMData = [];
let timeData = [];
// let userErrors = 0;

let milliseconds = 0;
let seconds = 0;
let minutes = 0;

let startTime;
let elapsedTimer = 0;
let timerInterval = null;

let startChart = null;

const textContainer = [
  "Choose exactly what you want for your next race. You can choose your bots (challengers).",
];

// Initialiser le graphique (Chart.js requis)
function initializeChart() {
  const ctx = document.getElementById("progressChart").getContext("2d");
  startChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "User WPM",
          borderColor: "blue",
          data: [],
          fill: false,
        },
        {
          label: "User CPM",
          borderColor: "green",
          data: [],
          fill: false,
        },
        {
          label: "Bot WPM",
          borderColor: "orange",
          data: [],
          fill: false,
        },
        {
          label: "Bot CPM",
          borderColor: "red",
          data: [],
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        x: {
          title: { display: true, text: "Time (s)" },
        },
        y: {
          title: { display: true, text: "Speed" },
        },
      },
    },
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
  const textElement = document.querySelector(".full"); // Assurez-vous que l'élément avec la classe "full" existe dans votre HTML

  const span = document.createElement("span");
  const text = textContainer[0];

  span.textContent = text;
  span.style.fontSize = "14px";
  span.style.fontFamily = "Roboto";
  textElement.appendChild(span);
}

// Fonction de vérification et coloration du texte cible
function check() {
  const inputText = document.querySelector(".text-input").value;
  const textElement = document.querySelector(".full");
  const spans = textElement.getElementsByTagName("span");

  // Colorer chaque caractère du texte cible
  for (let i = 0; i < textContainer[0].length; i++) {
    if (i < inputText.length) {
      if (inputText[i] === textContainer[0][i]) {
        spans[i].style.color = "green";
      } else {
        spans[i].style.color = "black";
      }
    } else {
      spans[i].style.color = "black";
    }
  }
}
// Réinitialiser les paramètres du jeu
function resetGame() {
  const userCar = document.querySelector(".user-car");
  const botCar = document.querySelector(".bot-car");
  const inputArea = document.querySelector(".text-input");
  resetTimer();
  userCar.style.left = "0px";
  botCar.style.left = "0px";
  inputArea.value = "";

  userProgress = 0;
  botProgress = 0;

  // displayScores();
}

// Déplacer une voiture
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
    wpmElement.textContent = `WPM: ${wpm.toFixed(2)}`;
    cpmElement.textContent = `CPM: ${cpm.toFixed(2)}`;
  }
  updateChart(wpm, cpm, player);
}

// Mettre à jour le graphique
function updateChart(wpm, cpm, player) {
  const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(1);
  if (!timeData.includes(elapsedTime)) {
    timeData.push(elapsedTime);
  }

  if (player === "user") {
    userWPMData.push(wpm);
    userCPMData.push(cpm);
    startChart.data.datasets[0].data = userWPMData;
    startChart.data.datasets[1].data = userCPMData;
  } else if (player === "bot") {
    botWPMData.push(wpm);
    botCPMData.push(cpm);
    startChart.data.datasets[2].data = botWPMData;
    startChart.data.datasets[3].data = botCPMData;
  }

  startChart.data.labels = timeData;
  startChart.update();
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
// function calculateAccuracy(userInput, targetText) {
//   const errors = countErrors(userInput, targetText);
//   const totalCharacters = userInput.length;
//   if (totalCharacters === 0) return 0;

//   return ((totalCharacters - errors) / totalCharacters) * 100;
// }

// Vérifier la saisie de l'utilisateur
function verifyInput() {
  const inputArea = document.querySelector(".text-input");
  const targetText = textContainer[0];
  const userCar = document.querySelector(".user-car");

  inputArea.addEventListener("input", () => {
    if (!startTime) startTime = Date.now();
    const elapsedTime = (Date.now() - startTime) / 60000;
    const userTyped = inputArea.value;

    if (targetText.startsWith(userTyped)) {
      userProgress = userTyped.length / targetText.length;
      moveCar(userCar, userProgress);

      const words = userTyped.split("").length;
      const characters = userTyped.legnth;

      const wpm = words / elapsedTime;
      const cpm = characters / elapsedTime;

      // const accuracy = calculateAccuracy(userTyped, targetText);
      // document.querySelector(
      //   ".accuracy"
      // ).textContent = `Accuracy: ${accuracy.toFixed(2)}%`;

      updateWPMCPM(wpm, cpm, "user");

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

  const baseSpeed = 10;
  // const minSpeed = 0.5;
  const botSpeed = (baseSpeed + Math.random() * 0.5) / textLength;

  // Ajustez cette vitesse en fonction de la longueur du texte
  // const botSpeed = baseSpeed + Math.random() * variability; // Vitesse aléatoire basée sur le texte
  // const textLength = textContainer[0].length;
  const adjustedSpeed = botSpeed / textLength; // Ajustement de la vitesse en fonction du texte

  const botInterval = setInterval(() => {
    if (!startTime) startTime = Date.now();
    const elapsedTime = (Date.now() - startTime) / 60000;
    botProgress += adjustedSpeed;

    const botTypedLength = Math.floor(botProgress * textContainer[0].length);
    const words = botTypedLength / 5;
    const characters = botTypedLength;

    const wpm = words / elapsedTime;
    const cpm = characters / elapsedTime;

    updateWPMCPM(wpm, cpm, "bot");

    if (botProgress >= 1) {
      botProgress = 1;
      moveCar(botCar, botProgress);
      clearInterval(botInterval);
      endGame("lose");
    }

    moveCar(botCar, botProgress);
  }, 50); // Mettre à jour toutes les 50 ms
}

// Gérer la fin de partie
function endGame(result) {
  const inputArea = document.querySelector(".text-input");
  if (result === "win") {
    userScore++;
    alert("Bravo ! Vous avez gagné !");
    stopTimer();
  } else if (result === "lose") {
    botScore++;
    alert("Dommage ! Le robot a gagné.");
  }

  resetGame();
}

// Afficher les scores
function displayScores() {
  const scoreElement = document.querySelector(".graph .performance span");
  scoreElement.textContent = `Utilisateur: ${userScore} | Robot: ${botScore}`;
}

// Initialiser le jeu
function startGame() {
  resetGame();
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
});

function callTostartGame() {
  displayScores();
  startGame();

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
  resetTimer();
  startTimerFunction();
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

/////CHRONO FUNCTIONS///

function updateTimer() {
  milliseconds += 10; // On incrémente par 10 ms

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
  const formattedTime =
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}:` +
    `${String(milliseconds).padStart(3, "0")}`;
  display.textContent = formattedTime;
}

function startTimerFunction() {
  if (!timerInterval) {
    startTime = Date.now() + elapsedTimer;
    timerInterval = setInterval(updateTimer, 10);
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  updateDisplay();
}

// import Chart from "chart.js/auto"
let userProgress = 0;
let botProgress = 0;
let userScore = 0;
let botScore = 0;
let startTime;

const textContainer = [
  "Choose exactly what you want for your next race. You can choose your bots (challengers).",
];
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

function check() {
  inputArea = document.querySelector()
}
// Afficher le texte d'introduction
function displayText() {
  const textElement = document.querySelector(".full"); // Assurez-vous que l'élément avec la classe "full" existe dans votre HTML

  const p = document.createElement("p");
  const text = textContainer[0];
  p.textContent = text;
  p.style.fontSize = "16px";
  p.style.fontFamily = "Roboto";
  textElement.appendChild(p);
}

// Réinitialiser les paramètres du jeu
function resetGame() {
  const userCar = document.querySelector(".user-car");
  const botCar = document.querySelector(".bot-car");
  const inputArea = document.querySelector(".text-input");

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

  // car.style.left = `${progress * maxPosition}px`;
}

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

      // const words = userTyped.split("").length;
      // const characters = userTyped.legnth;

      // const wpm = words / elapsedTime;
      // const cpm = characters / elapsedTime;

      // updateWPMCPM(wpm, cpm, "user");

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

  // Ajustez cette vitesse en fonction de la longueur du texte
  const botSpeed = Math.random() * (0.01 - 0.005) + 0.5; // Vitesse aléatoire basée sur le texte
  const textLength = textContainer[0].length;
  const adjustedSpeed = botSpeed / textLength; // Ajustement de la vitesse en fonction du texte

  const botInterval = setInterval(() => {
    if (!startTime) startTime = Date.now();
    const elapsedTime = (Date.now() - startTime) / 60000;
    botProgress += adjustedSpeed;

    const botTypedLength = Math.floor(botProgress * textContainer[0].length);
    // const words = botTypedLength / 5;
    // const characters = botTypedLength;

    // const wpm = words / elapsedTime;
    // const cpm = characters / elapsedTime;

    // updateWPMCPM(wpm, cpm, "bot");

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

// function initializeGame() {
//   const starter = document.querySelector("button");
//   if (starter) {
//     starter.addEventListener("click", () => {
//       // initializeRoadLines();
//       // displayText();
//       // displayScores();
//       startGame();
//     });
//   } else {
//     console.log("start est introuvable");
//   }
// }

document.addEventListener("DOMContentLoaded", () => {
  // initializeGame();
  initializeRoadLines();
  displayText();
  displayScores();
  startGame();
});

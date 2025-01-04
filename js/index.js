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

// function check() {
//   const inputArea = document.querySelector(".text-input").value;
//   const targetText = textContainer[0]; // Utilisez directement le texte de référence
//   const result = document.querySelector(".result");

//   // Vider le conteneur de résultat
//   result.innerHTML = "";

//   // Créer un fragment pour optimiser les performances
//   const fragment = document.createDocumentFragment();

//   // Parcourir chaque caractère du texte cible
//   targetText.split("").forEach((char, index) => {
//     const span = document.createElement("span");
//     span.textContent = char;

//     // Si l'utilisateur a tapé quelque chose à cette position
//     if (index < inputArea.length) {
//       if (inputArea[index] === char) {
//         span.style.color = "green"; // Caractère correct
//       } else {
//         span.style.color = "red"; // Caractère incorrect
//       }
//     } else {
//       span.style.color = "gray"; // Pas encore tapé
//     }

//     fragment.appendChild(span);
//   });

//   // Ajouter tous les spans en une seule fois
//   result.appendChild(fragment);
// }

// function displayText() {
//   const textElement = document.querySelector(".full");
//   const resultElement = document.querySelector(".result");

//   // Afficher le texte original dans .full
//   textElement.textContent = textContainer[0];

//   // Préparer le texte coloré dans .result
//   const fragment = document.createDocumentFragment();
//   textContainer[0].split("").forEach((char) => {
//     const span = document.createElement("span");
//     span.textContent = char;
//     span.style.color = "gray"; // Couleur par défaut
//     fragment.appendChild(span);
//   });

//   resultElement.innerHTML = ""; // Vider d'abord
//   resultElement.appendChild(fragment);
// }

// function check() {
//   const inputText = document.querySelector(".text-input").value;
//   const resultElement = document.querySelector(".result");
//   const spans = resultElement.getElementsByTagName("span");

//   // Colorer chaque caractère
//   for (let i = 0; i < textContainer[0].length; i++) {
//     if (i < inputText.length) {
//       if (inputText[i] === textContainer[0][i]) {
//         spans[i].style.color = "green";
//       } else {
//         spans[i].style.color = "red";
//       }
//     } else {
//       spans[i].style.color = "gray";
//     }
//   }
// }

// function displayText() {
//   const textElement = document.querySelector(".full");

//   // Créer un span pour chaque caractère
//   const fragment = document.createDocumentFragment();
//   textContainer[0].split("").forEach((char) => {
//     const span = document.createElement("span");
//     span.textContent = textContainer[0];
//     fragment.appendChild(span);
//   });
//   textElement.appendChild(fragment);
//   // textElement.innerHTML = ""; // Vider d'abord
// }

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

import { textManager,namesContainer, powerContainer, gameState } from "./gameData";
import {themLoader} from "./theme"
import {displayFinalChart} from "./graph"


function gameManager() { 
  console.log("Checking game state..."); 

  // Vérifier que la partie a bien commencé avant d'avancer le texte
  if (gameState.gameStarted) { 
    if ((gameState.userFinished && !gameState.botFinished) || !gameState.carFinished) {
      console.log("User won! Moving to next text...");
      endGame('user win');

      // Passe au texte suivant seulement si on n'a pas atteint la fin du tableau
      textManager.nextText();
    } else {
      console.log('Game is ongoing...');
    }
  } else {
    console.log("Game has not started yet, text remains the same.");
  }

  console.log('Current text is:', textManager.getCurrentText()[0]); 
  return textManager.getCurrentText()[0]; // Retourne le texte actuel
}



// function gameManager() { 
//   if ((gameState.userFinished && !gameState.botFinished) || !gameState.carFinished) {
//     endGame('user win');

//     // Passe au texte suivant seulement si on n'a pas atteint la fin du tableau
//     textManager.nextText();
//   } else {
//     console.log('Game is ongoing...');
//   }
// console.log('current text is', textManager.getCurrentText()[0])
//   return textManager.getCurrentText()[0]; // Retourne la chaîne de caractères, et non un tableau

// }

function check() {
  const inputText = document.querySelector(".text-input").value; // Texte saisi par l'utilisateur
  const textElement = document.querySelector(".full");
  const spans = textElement.getElementsByTagName("span"); // Les <span> du texte cible
  const textContainer = gameManager(); // Maintenant, textContainer est une STRING
  
  // Parcourt le texte cible caractère par caractère
  for (let i = 0; i < textContainer.length; i++) {
    if (spans[i]) {
      if (i < inputText.length) {
        // Vérifie si le caractère saisi correspond au caractère cible
        if (inputText[i] === textContainer[i]) {
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

// function gameManager() {
//   // Vérifie si l'utilisateur a terminé et que le bot n'a pas encore terminé, ou si la voiture n'a pas terminé
//   if ((gameState.userFinished && !gameState.botFinished) || !gameState.carFinished) {
//     endGame('user win');
    
//     // Incrémente currentIndex seulement si on n'est pas déjà à la fin du tableau
//     if (gameState.currentIndex < textContainer.length - 1) {
//       gameState.currentIndex++;
//     }
//   } else {
//     // Si la condition n'est pas remplie, tu peux ajouter d'autres actions ou un message
//     console.log('Game is ongoing...');
//   }

//   // Retourne le texte à afficher en fonction de l'index actuel
//   return textContainer[gameState.currentIndex];
// }
// 

// function gameManager() {
//   if ((gameState.userFinished && !gameState.botFinished) || !gameState.carFinished) {
//     // Si l'utilisateur a gagné, on appelle la fonction de fin du jeu
//     endGame('user win');
    
//     if (gameState.currentIndex < textContainer.length - 1) {
//       gameState.currentIndex++;
//     }
//   } else {
//     // Jeu en cours
//     console.log('Game is ongoing...');
//   }

//   return textContainer[gameState.currentIndex];
// }
// function gameManager() {
//   if ((gameState.userFinished && !gameState.botFinished) || !gameState.carFinished) {
//     endGame('user win');

//     // Passe au texte suivant seulement si on n'a pas atteint la fin du tableau
//     textManager.nextText();
//   } else {
//     console.log('Game is ongoing...');
//   }

//   return textManager.getCurrentText();
// }


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

  const toggleDisplay = (element, container, input, callback) => {
    if (element.style.display === "none") {
      element.innerHTML = "";
      displayUser(container, element, input, (selectedBot) => {
        callback(selectedBot); 
      });
      resetElement(
        input,
        element.classList.contains("select-name") ? "name" : "power"
      );
      element.style.display = "flex"; 
    } else {
      element.style.display = "none";
    }
  };

  // Gestion du clic sur le nom
  names.addEventListener("click", () => {
    toggleDisplay(otherN, namesContainer, names, (selectedBot) => {
      gameState.selectedName = selectedBot; // Mettre à jour le nom du bot sélectionné
    });
  });

  // Gestion du clic sur la puissance
  powers.addEventListener("click", () => {
    toggleDisplay(otherW, powerContainer, powers, (selectedBot) => {
      gameState.selectedPower = selectedBot; // Mettre à jour la puissance du bot sélectionné
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

  gameState.bots[name] = { name, powers };
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
    gameState.selectedName = ""; // Réinitialiser le nom du bot
    gameState.selectedPower = ""; // Réinitialiser la puissance du bot
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
  gameState.bots = []; // Réinitialise la liste des bots
  // botCreated = false; // Réinitialise l'état du bot
  gameState.botCount = 0; // Réinitialise le compteur de bots
}

function normalRace() {
  if (normal) {
    // Si le mode "normal" est déjà actif, ne rien faire
    console.log("Mode normal déjà actif, aucune action effectuée.");
    return;
  }

  // Passer en mode "normal"
  resetGame();
  gameState.normal = true;
  gameState.custom = false;
  gameState.computer = false;

  clearRaceContainer();
  console.log("Mode normal activé.");
  return gameState.normal;
}

function customRace() {
  if (gameState.custom) {
    // Si le mode "custom" est déjà actif, ne rien faire
    console.log("Mode custom déjà actif, aucune action effectuée.");
    return;
  }

  // Passer en mode "custom"
  resetGame();
  gameState.normal = false;
  gameState.custom = true;
  gameState.computer = false;

  clearRaceContainer();

  // Vérification si le bot existe déjà dans la liste des bots
  const botExists = gameState.bots.some(
    (bot) => bot.name === gameState.selectedName && bot.power === gameState.selectedPower
  );

  if (botExists) {
    console.log("Ce bot a déjà été ajouté.");
    return; // Si le bot existe déjà, ne rien faire
  } else {
    gameState.bots.push({ name: gameState.selectedName, power: gameState.selectedPower });
    console.log("Bot ajouté :", gameState.bots);
    createdBot();
    gameState.botCount++;
    console.log("Bot ajouté : ", gameState.selectedName, "Puissance : ", gameState.selectedPower);
  }

  console.log("Mode custom activé.");
  return gameState.custom;
}

function createdBot() {
  const raceTracker = document.querySelector(".race");
  if (gameState.custom) {
    gameState.bots.forEach((bot) => {
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
  if (gameState.computer) {
    // Si le mode "computer" est déjà actif, ne rien faire
    console.log("Mode computer déjà actif, aucune action effectuée.");
    return;
  }

  // Passer en mode "computer"
  resetGame();
  gameState.normal = false;
  gameState.custom = false;
  gameState.computer = true;

  clearRaceContainer();

  if (!gameState.botCreated) {
    renderPlayerTrack();
    gameState.botCreated = true;
  }

  console.log("Mode computer activé.");
  return gameState.computer;
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
  const text = gameManager();
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

// function check() {
//   const inputText = document.querySelector(".text-input").value.trim(); // Texte saisi par l'utilisateur (on supprime les espaces en début et fin)
//   const textElement = document.querySelector(".full");
//   const spans = textElement.getElementsByTagName("span"); // Les <span> du texte cible
//   const textContainer = gameManager(); // Texte retourné par gameManager()

//   console.log('Spans:', spans); // Affiche les spans pour débogage
//   console.log("Text:", textContainer);

//   // Parcourt le texte cible caractère par caractère
//   for (let i = 0; i < textContainer.length; i++) {
//     if (spans[i]) {
//       if (i < inputText.length) {
//         // Vérifie si le caractère saisi correspond au caractère cible
//         const inputChar = inputText[i].toLowerCase(); // Convertir en minuscule pour normalisation
//         const targetChar = textContainer[i].toLowerCase(); // Convertir en minuscule pour normalisation

//         if (inputChar === targetChar) {
//           spans[i].className = "correct"; // Correct
//           console.log('Correct span:', spans[i].textContent);
//         } else {
//           spans[i].className = "incorrect"; // Incorrect
//           console.log('Incorrect span:', spans[i].textContent);
//         }
//       } else {
//         spans[i].className = ""; // Pas encore saisi
//       }
//     } else {
//       // Si l'index dépasse le nombre de spans, on arrête la boucle
//       break;
//     }
//   }
// }

// function check() {
//   const inputText = document.querySelector(".text-input").value; // Texte saisi par l'utilisateur
//   const textElement = document.querySelector(".full");
//   const spans = textElement.getElementsByTagName("span"); // Les <span> du texte cible
//   const textContainer = gameManager()
//   // Parcourt le texte cible caractère par caractère
//   for (let i = 0; i < textContainer.length; i++) {
//     if (spans[i]) {
//       if (i < inputText.length) {
//         // Vérifie si le caractère saisi correspond au caractère cible
//         if (inputText[i] === textContainer[i]) {
//           spans[i].className = "correct"; // Correct
//         } else {
//           spans[i].className = "incorrect"; // Incorrect
//         }
//       } else {
//         spans[i].className = ""; // Pas encore saisi
//       }
//     }
//   }
// }


// Réinitialiser les paramètres du jeu
function resetGame() {
  const userCar = document.querySelector(".user-car");
  const inputArea = document.querySelector(".text-input");
  if (gameState.normal) {
    clearInterval(gameState.timerInterval);
    gameState.startTime = null;

    gameState.userProgress = 0;
    gameState.userWPMData = [];
    gameState.userCPMData = [];
    gameState.timeData = [];
    inputArea.value = "";

    if (gameState.startChart) {
      gameState.startChart.destroy();
      gameState.startChart = null;
    }

    userCar.style.transform = "translateX(0)";
  } else if ( gameState.custom &&  gameState.computer &&  gameState.botCreated) {
    const botCar = document.querySelector("#robot-car");
    gameState.bots = [];

    clearInterval( gameState.timerInterval);
    gameState.startTime = null;
    gameState.botCreated = false;

    gameState.userProgress = 0;
    gameState.userWPMData = [];
    gameState.userCPMData = [];

    gameState.botProgress = 0;
    gameState.botWPMData = [];
    gameState.botCPMData = [];
    gameState.timeData = [];
    gameState.inputArea.value = "";

    if ( gameState.startChart) {
      gameState.startChart.destroy();
      gameState.startChart = null;
    }

    // botCar.style.transform = "translateX(0)";
    botCar.style.transform = "translateX(0)";
  }
  gameState.timeData = [];
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

// Mettre à jour le graphique
function updateChart(wpm, cpm, player) {
  const elapsedTime = updateDisplay();
  // const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(1);
  const maxDataPoints = 50;
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

// Vérifier la saisie de l'utilisateur
function verifyInput() {
  const inputArea = document.querySelector(".text-input");
  const targetText = gameManager();
  const userCar = document.querySelector(".user-car");
  const graphElement = document.querySelector(".graph");
  inputArea.addEventListener("input", () => {
    if (! gameState.startTime)  gameState.startTime = Date.now();
    // const elapsedTime = (Date.now() - startTime) / 60000;
    const userTyped = inputArea.value;

    if (targetText.startsWith(userTyped)) {
      gameState.userProgress = userTyped.length / targetText.length;
      moveCar(userCar,  gameState.userProgress);
      updateWPMCPMRealtime(userTyped, targetText, "user");

      if (userTyped === targetText) {
        gameState.userFinished = true;
        // endGame("win");
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

  const text = gameManager();
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
      if (! gameState.startTime)  gameState.startTime = Date.now(); // Démarre le chronomètre au début

      // Mise à jour de la progression du bot
      gameState.botProgress += baseSpeed;
      gameState.botProgress = Math.min(botProgress, 1); // Limite la progression à 1 (100%)

      // Déplace la voiture
      moveCar(botCar,  gameState.botProgress);

      // Met à jour WPM et CPM tant que le bot n'a pas terminé
      if ( gameState.botProgress < 1) {
        updateWPMCPM(wpm, cpm, bot);
      }

      // Si le bot atteint la fin
      if ( gameState.botProgress >= 1) {
        gameState.carFinished = true;
        gameState.botProgress = 1; // Assure que la progression ne dépasse pas 1
        clearInterval( gameState.botInterval); // Arrête l'intervalle
        console.log(`Bot "${bot}" a terminé avec ${wpm} WPM !`);
      }
    }, 100); // Mettre à jour toutes les 100 ms
  } else if (gameState.computer) {
    // Cas par défaut si aucun bot ou power n'est défini
    bot = "bot";
    power = 0;
    const textContainer = gameManager()
    const defaultbaseSpeed = 3;
    // const minSpeed = 0.5;
    const botSpeed = (defaultbaseSpeed + Math.random() * 0.5) / textLength;

    const adjustedSpeed = botSpeed / textLength; // Ajustement de la vitesse en fonction du texte

    const botInterval = setInterval(() => {
      if (! gameState.startTime)  gameState.startTime = Date.now();
      // const elapsedTime = (Date.now() - startTime) / 60000;
      gameState.botProgress += adjustedSpeed;

      const botTypedLength = Math.floor(botProgress * textContainer.length);
      const botText = textContainer.substring(0, botTypedLength);

      updateWPMCPMRealtime(botText, textContainer, bot);
      console.log("botText", botText);
      console.log("textConntainer", textContainer);
      console.log(
        `Débogage: botProgress=${ gameState.botProgress}, bot=${bot}, textContainer=${textContainer}`
      );

      if ( gameState.botProgress >= 1) {
        gameState.botProgress = 1;
        gameState.botFinished = true;
        moveCar(botCar,  gameState.botProgress);
        // requestAnimationFrame(startBot)
        clearInterval( gameState.botInterval);
        endGame("lose");
      }
      moveCar(botCar,  gameState.botProgress);
    }, 16); // Mettre à jour toutes les 50 ms
  }
}

// Gérer la fin de partie
function endGame(result) {
  // const inputArea = document.querySelector(".text-input");
  if (result === "win") {
    gameState.userScore++;
    stopTimer();
    // alert("Bravo ! Vous avez gagné !");
  } else if (result === "lose") {
    gameState.botScore++;
    // alert("Dommage ! Le robot a gagné.");
  }
  // resetGame();
  displayFinalChart();
}

// Afficher les scores
function displayScores() {
  const scoreElement = document.querySelector(".graph .performance span");
  scoreElement.textContent = `Utilisateur: ${gameState.userScore} | Robot: ${gameState.botScore}`;
}

function startGame() {
  // Réinitialiser le jeu et le minuteur

  if ( gameState.computer &&  gameState.botCreated) {
    resetGame();
    resetTimer();
    verifyInput();
    startBot();
  } else if ( gameState.custom) {
    verifyInput();
    gameState.bots.forEach((bot) => {
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
  themLoader();
  gameResult();

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
  gameState.milliseconds += 100; // On incrémente par 10 ms

  if ( gameState.milliseconds >= 1000) {
    gameState.milliseconds = 0;
    gameState.seconds++; // Incrémenter les secondes

    if ( gameState.seconds >= 60) {
      gameState.seconds = 0;
      gameState.minutes++; // Incrémenter les minutes
    }
  }

  updateDisplay();
}

function updateDisplay() {
  const display = document.querySelector(".time");
  display.innerHTML = "";
  const formattedTime = `${String( gameState.minutes).padStart(2, "0")}:${String(
    gameState.seconds
  ).padStart(2, "0")}`;
  display.textContent = formattedTime;
  console.log("time", formattedTime);
  return formattedTime;
}
console.log("function chrono", updateDisplay());

function startTimerFunction() {
  if (! gameState.timerInterval) {
    gameState.startTimer = Date.now() +  gameState.elapsedTimer;
    gameState.timerInterval = setInterval(() => {
      gameState.elapsedTime++;
      updateTimer();
    }, 100);
  }
}

function stopTimer() {
  clearInterval( gameState.timerInterval);
  gameState.timerInterval = null;
  // elapsedTimer += Date.now() - startTimer;
}

function resetTimer() {
  gameState.milliseconds = 0;
  gameState.seconds = 0;
  gameState.minutes = 0;
  gameState.elapsedTimer = 0;
  updateDisplay();
}

function countErrors(userInput, targetText) {
  let errors = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] !== targetText[i]) {
      errors++;
    }
  }
  gameState.userErrors = errors;
  return errors;
}

function calculateAccuracy(userInput, targetText) {
  const errors = countErrors(userInput, targetText);
  const totalCharacters = userInput.length;
  if (totalCharacters === 0) return 0;
  let accuracy = ((totalCharacters - errors) / totalCharacters) * 100;

  return accuracy;
}

function gameResult() {
  const inputArea = document.querySelector(".text-input");
  const targetText = gameManager();
  // document.querySelector(".text-container")
  // .textContent.trim(); // Correction
  const words = targetText.split(/\s+/);

  inputArea.addEventListener("input", () => {
    if (! gameState.startTime)  gameState.startTime = Date.now();
    const userTyped = inputArea.value;

    countErrors(userTyped, targetText);

    const userWPM = Math.max(...gameState.userWPMData, 0); // Meilleur score WPM
    const userCPM = Math.max(...gameState.userCPMData, 0); // Meilleur score CPM
    const timeElapsed = Math.max(...gameState.timeData, 0);
    const accuracy = calculateAccuracy(userTyped, targetText);
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
  
    updateResultElement("wpm", `WPM: ${ gameState.userWPM}`);
    updateResultElement("cpm", `CPM: ${ gameState.userCPM}`);
    updateResultElement("time-data", `Time: ${ gameState.timeElapsed}s`);
    updateResultElement("accuracy-data", `Accuracy: ${ gameState.accuracy}%`);
    updateResultElement("error-data", `Errors: ${ gameState.errorCount}`);
    updateResultElement("word-data", `Words: ${words.length}`);
  });

}
 
 
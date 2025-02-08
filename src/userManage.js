import { gameState,namesContainer,powerContainer} from "./gameData";
 import { computerRace, customRace, normalRace } from "./mode";
 import { renderPlayerTrack } from "./render";
 // Function to create a new user with name and power


function createUser() {
  const nameInput = document.querySelector(".input-name");
  const wpmInput = document.querySelector(".input-wpm");
  const addSec = document.querySelector(".add-section");
  const name = nameInput.value.trim();
  const wpm = wpmInput.value.trim();

  if (!name || isNaN(wpm) || wpm <= 0) {
    alert("Please enter a valid name and a WPM greater than 0.");
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
  const remove = document.querySelectorAll(".remove-element");
  remove.forEach(element => {
    element.addEventListener("click", () => {
      if (domelement) {
        domelement.innerHTML = names;
      }
    });
  });
}


export function select() {
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


export function addPlayer() {
  const name = document.querySelector(".select-name").value;
  const powers = document.querySelector(".select-power").value;
  const custom = document.querySelector(".add-section");

  if (!name || !powers) {
    return;
  }

  gameState.bots[name] = { name, powers };
  custom.style.display = "none";
}

// export function manageUserMode() {
//   const normal = document.querySelector(".normal");
//   const custom = document.querySelector(".custom");
//   const comput = document.querySelector(".computer");
//   const items = document.querySelector(".addItems");
//   const add = document.querySelector(".add-section");
//   const added = document.querySelector(".added");
//   const player = document.querySelector(".start");
//   const addsection = document.querySelector(".select-area");

//   normalRace()

//   normal.addEventListener("click", () => {
//     normalRace();
//   });

//   custom.addEventListener("click", () => {
//     if (addsection.style.display === "none") {
//       addsection.style.display = "block";
//     } else {
//       addsection.style.display = "none";
//     }
//   });
// // 
//   comput.addEventListener("click", () => {
//     computerRace();
//   });

//   items.addEventListener("click", () => {
//     if (add.style.display === "none") {
//       add.style.display = "block";
//     } else {
//       add.style.display = "none";
//     }
//   });

//   added.addEventListener("click", () => {
//     // Enregistrer le bot et afficher un message de confirmation
//     createUser();
//     alert("Bot enregistré avec succès !");
//   });

//   player.addEventListener("click", () => {
//     customRace(); // Ajouter le bot

//     // Afficher tous les bots créés

//     // Cacher la section d'ajout
//     addsection.style.display = "none";

//     // Réinitialiser la sélection après l'ajout
//     gameState.selectedName = ""; // Réinitialiser le nom du bot
//     gameState.selectedPower = ""; // Réinitialiser la puissance du bot
//   });
// }

export function manageUserMode() {
  const normal = document.querySelector(".normal");
  const custom = document.querySelector(".custom");
  const comput = document.querySelector(".computer");
  const items = document.querySelector(".addItems");
  const add = document.querySelector(".add-section");
  const added = document.querySelector(".added");
  const player = document.querySelector(".start");
  const addsection = document.querySelector(".select-area");

  let modeSelected = false; // Variable pour suivre si un mode a été choisi

  // Définir le mode normal par défaut après un délai si aucun autre mode n'est sélectionné
  setTimeout(() => {
    if (!modeSelected) {
      normalRace();
      console.log("Mode normal activé par défaut.");
    }
  }, 2000); // 2 secondes d'attente avant d'activer le mode normal par défaut

  normal.addEventListener("click", () => {
    modeSelected = true;
    normalRace();
  });

  custom.addEventListener("click", () => {
    modeSelected = true;
    addsection.style.display = addsection.style.display === "none" ? "block" : "none";
  });

  comput.addEventListener("click", () => {
    modeSelected = true;
    computerRace();
  });

  items.addEventListener("click", () => {
    add.style.display = add.style.display === "none" ? "block" : "none";
  });

  added.addEventListener("click", () => {
    createUser();
    alert("Bot enregistré avec succès !");
  });

  player.addEventListener("click", () => {
    customRace();
    addsection.style.display = "none";
    gameState.selectedName = ""; 
    gameState.selectedPower = "";
  });
}

export function clearRaceContainer() {
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

export function createdBot() {
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
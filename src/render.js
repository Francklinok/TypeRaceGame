
export function initializeRoadLines() {
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
  
export function renderPlayerTrack(selectName) {
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
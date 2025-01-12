function renderPlayerTrack(name) {
  const raceTracker = document.querySelector(".car-center");
  const container = document.createElement("div");
  const bot = bots[name];

  if (bot) {
    let player = bot.name;
    container.className = "container";

    // Creating elements instead of using innerHTML
    const raceDiv = document.createElement("div");
    raceDiv.className = "race";

    // Left section with user info
    const userLeft = document.createElement("div");
    userLeft.className = "user-left";
    const firstUser = document.createElement("div");
    firstUser.className = "first-user";
    const userName = document.createElement("p");
    userName.textContent = "me";
    firstUser.appendChild(userName);
    userLeft.appendChild(firstUser);

    // Road with car and line
    const road = document.createElement("div");
    road.className = "road";
    const playerCar = document.createElement("img");
    playerCar.className = "player-car";
    playerCar.src = "./car6.svg"; // Correct image path
    const line = document.createElement("div");
    line.className = "line";
    road.appendChild(playerCar);
    road.appendChild(line);

    // Flag section
    const flag = document.createElement("div");
    flag.className = "flag";
    const finishSpan = document.createElement("span");
    finishSpan.textContent = "Finish";
    flag.appendChild(finishSpan);

    // Params on the right
    const paramsRight = document.createElement("div");
    paramsRight.className = "params-right";
    const firstParams = document.createElement("div");
    firstParams.className = "first-params";
    const userWpm = document.createElement("p");
    userWpm.className = "user-wpm";
    userWpm.textContent = "0: wpm";
    const userCpm = document.createElement("p");
    userCpm.className = "user-cpm";
    userCpm.textContent = "0: cpm";
    firstParams.appendChild(userWpm);
    firstParams.appendChild(userCpm);
    paramsRight.appendChild(firstParams);

    // Appending everything to the container
    raceDiv.appendChild(userLeft);
    raceDiv.appendChild(road);
    raceDiv.appendChild(flag);
    raceDiv.appendChild(paramsRight);

    container.appendChild(raceDiv);
    raceTracker.appendChild(container);
  }
}

function useGameData() {
  let gameData = {
    textContainer: [
      "Choose exactly what you want for your next race. You can choose your bots (challengers).",
      "Choose exactly what you want for your next race. You can choose your bots by entery his name and the power of the bot.",
      "Choose exactly what you want for your next race. You can choose your bots .you can train it yoursefl too to improve your level befor start compet with others.",
    ],
    namesContainer: ["jacques", "firmain", "sam", "paul"],
    powerContainer: [
      "80 wpm",
      "70 wpm",
      "60 wpm",
      "50 wpm",
      "40 wpm",
      "30 wpm",
      "20 wpm",
      "10 wpm",
    ],
    carsConainer: ["car0", "car1", "car2", "car3", "car6"],
    gameState: "waiting",
    normal: false,
    computer: false,
    custom: false,
    botCreated: false,
    userProgress: 0,
    botProgress: 0,
    userScore: 0,
    botScore: 0,
    userFinished: 0,
    botFinished: 0,
    userWPMData: [],
    userCPMData: [],
    botWPMData: [],
    botCPMData: [],
    timeData: [],
    userErrors: 0,
    startTime: 0,
    elasedTime: 0,
    timerInterval: 0,
    millisecond: 0,
    second: 0,
    minutes: 0,
    startTimer: null,
    elapsedTimer: 0,
    startChart: null,
  };
}

// Mouvement automatique du robot
// function startBot(bot = null, power = null) {
//   const botCar = document.querySelector(".bot-car");
//   const textLength = textContainer[0].length;
//   let baseSpeed;

//   if (bot && power) {
//     const selectedCar = document.querySelector(`.${bot}-car`);
//     let wpm = parseInt(power, 10);
//     console.log("wpm", wpm);

//     let cpm = wpm * 5;

//     baseSpeed = wpm / 60;
//     const botinterval = setInterval(() => {
//       if (!startTime) startTime = Date.now();
//       botProgress += baseSpeed / 100;
//       if (botProgress > 1) botProgress = 1;
//       console.log("botprogresse", botProgress);
//       moveCar(selectedCar, botProgress);
//       if (botProgress >= 1) {
//         clearInterval(botinterval);
//         console.log(`Bot avec ${bot.wpm} WPM a terminé !`);
//       }
//     }, 100);
//     updateWPMCPM(wpm, cpm, bot);
//   }

//   baseSpeed = 3;
//   // const minSpeed = 0.5;
//   const botSpeed = (baseSpeed + Math.random() * 0.5) / textLength;

//   const adjustedSpeed = botSpeed / textLength; // Ajustement de la vitesse en fonction du texte

//   const botInterval = setInterval(() => {
//     if (!startTime) startTime = Date.now();
//     // const elapsedTime = (Date.now() - startTime) / 60000;
//     botProgress += adjustedSpeed;

//     const botTypedLength = Math.floor(botProgress * textContainer[0].length);
//     const botText = textContainer[0].substring(0, botTypedLength);
//     updateWPMCPMRealtime(botText, textContainer[0], "bot");

//     if (botProgress >= 1) {
//       botProgress = 1;
//       moveCar(botCar, botProgress);
//       // requestAnimationFrame(startBot)
//       clearInterval(botInterval);
//       endGame("lose");
//     }
//     moveCar(botCar, botProgress);
//   }, 16); // Mettre à jour toutes les 50 ms
// }

// const defaultBaseSpeed = 3 // textLength; // Ajustement de la vitesse par la longueur du texte
// const botSpeed = (baseSpeed + Math.random() * 0.5) / textLength;

// const botInterval = setInterval(() => {
//   if (!startTime) startTime = Date.now();

//   // Mise à jour de la progression
//   botProgress += defaultBaseSpeed;
//   botProgress = Math.min(botProgress, 1);

//   const botTypedLength = Math.floor(botProgress * textContainer[0].length);
//   const botText = textContainer[0].substring(0, botTypedLength);

//   // Met à jour WPM et CPM en temps réel
//   updateWPMCPMRealtime(botText, textContainer[0], "bot");

//   // Si le bot atteint la fin
//   if (botProgress >= 1) {
//     botProgress = 1;
//     moveCar(botCar, botProgress);
//     clearInterval(botInterval); // Arrête l'intervalle
//     endGame("lose");
//   }

//   // Déplace la voiture
//   moveCar(botCar, botProgress);
// }, 16); // Met à jour toutes les 16 ms (~60 FPS)



export const textManager = {
  texts: [
    "Choose your bots and start the race.",
    "Select your challengers and prepare to compete.",
    "Pick your bots, select your track, and get ready!",
    "Prepare for victory by choosing your bots and customizing your race settings.",
    "Choose exactly what you need to dominate the competition. Customize your bots, opponents, and track.",
    "The next race is yours to command! Select your bots, decide the terrain, and challenge opponents for ultimate glory.",
    "Unleash your racing strategy by choosing your bots, defining your terrain, and handpicking challengers. Every decision shapes your path to victory—are you ready to race?"
  ],
  currentIndex: 0,

  getCurrentText() {
    return this.texts[this.currentIndex];
  },
  nextText() {
    if (this.currentIndex < this.texts.length - 1) {
      this.currentIndex++;
    } else {
      alert("🎉 Félicitations ! Vous avez terminé tous les niveaux !");
    }
    return this.texts[this.currentIndex] || this.texts[this.texts.length - 1];
  }
};
// // export const textManager = {
// //   texts: [
// //     ["Choose your bots and start the race."],
// //     ["Select your challengers and prepare to compete."],
// //     ["Pick your bots, select your track, and get ready!"],
// //     ["Prepare for victory by choosing your bots and customizing your race settings."],
// //     ["Choose exactly what you need to dominate the competition. Customize your bots, opponents, and track."],
// //     ["The next race is yours to command! Select your bots, decide the terrain, and challenge opponents for ultimate glory."],
// //     ["Unleash your racing strategy by choosing your bots, defining your terrain, and handpicking challengers. Every decision shapes your path to victory—are you ready to race?"]
// //   ],
// //   currentIndex: 0, // Index actuel

// //   getCurrentText() {
// //     return this.texts[this.currentIndex]; // Récupère le texte actuel sous forme de tableau
// //   },
// //   nextText() {
// //     if (this.currentIndex < this.texts.length - 1) {
// //       this.currentIndex++; // Passe au texte suivant
// //       return this.texts[this.currentIndex]; // Retourne le texte mis à jour
// //     } else {
// //       alert("🎉 Félicitations ! Vous avez terminé tous les niveaux !");
// //       return this.texts[this.currentIndex]; // Retourne le dernier texte disponible
// //     }
// //   }
  
// // };

// export const textManager = {
//   texts: [
//     "Choose your bots and start the race.",
//     "Select your challengers and prepare to compete.",
//     "Pick your bots, select your track, and get ready!",
//     "Prepare for victory by choosing your bots and customizing your race settings.",
//     "Choose exactly what you need to dominate the competition. Customize your bots, opponents, and track.",
//     "The next race is yours to command! Select your bots, decide the terrain, and challenge opponents for ultimate glory.",
//     "Unleash your racing strategy by choosing your bots, defining your terrain, and handpicking challengers. Every decision shapes your path to victory—are you ready to race?"
//   ],
//   currentIndex: 0, // Index actuel

//   // Retourne le texte courant
//   getCurrentText() {
//     return this.texts[this.currentIndex];
//   },
//   // Passe au texte suivant et le retourne
//   nextText() {
//     if (this.currentIndex < this.texts.length - 1) {
//       this.currentIndex++; // Passe au texte suivant
//     } else {
//       alert("🎉 Félicitations ! Vous avez terminé tous les niveaux !");
//     }
//     return this.texts[this.currentIndex];
//   }

// };
let r = textManager.getCurrentText()
let x = textManager.nextText()

console.log("text",r)

console.log(textManager.texts[0])
console.log("new text is", x)


export const namesContainer = ["jacques", "firmain", "sam", "paul"];
export const powerContainer = [
  "80 wpm",
  "70 wpm",
  "60 wpm",
  "50 wpm",
  "40 wpm",
  "30 wpm",
  "20 wpm",
  "10 wpm",
];

export const gameState = {
  bots: [],
  normal: false,
  custom: false,
  computer: false,
  botCreated: false,
  botCount: 0,
  selectedName: null,
  selectedPower: null,
  userProgress: 0,
  botProgress: 0,
  userScore: 0,
  botScore: 0,
  userFinished: false,
  botFinished: false,
  carFinished: false,
  userWPMData: [],
  userCPMData: [],
  botWPMData: [],
  botCPMData: [],
  timeData: [],
  userErrors: 0,
  startTime: undefined,
  elapsedTime: 0,
  timerInterval: null,
  milliseconds: 0,
  seconds: 0,
  minutes: 0,
  elapsedTimer: 0,
  startChart: null,
  nbErreurs : 0,
  precision : 0,
  text:textManager.getCurrentText,
  // currentIndex: 0,
};
console.log("gamestate test is", gameState.text)
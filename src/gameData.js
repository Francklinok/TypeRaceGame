// Class that manages the different instruction texts for the game
export class TextManager {
  constructor() {
      // Array of texts to be displayed at different stages of the game
      this.texts = [
        "Choose your bots and start the race.",
        "Select your challengers and prepare to compete.",
        "Pick your bots, select your track, and get ready!",
        "Prepare for victory by choosing your bots and customizing your race settings.",
        "Choose exactly what you need to dominate the competition. Customize your bots, opponents, and track.",
        "The next race is yours to command! Select your bots, decide the terrain, and challenge opponents for ultimate glory.",
        "Unleash your racing strategy by choosing your bots, defining your terrain, and handpicking challengers. Every decision shapes your path to victory—are you ready to race?"
      ];

      // Current index to track the text that is being displayed
      this.currentIndex = 0;
  }

  // Returns the current text based on the index
  getCurrentText() {
      return this.texts[this.currentIndex] || "";
  }
  // Advances to the next text if available
  nextText() {
      if (this.currentIndex < this.texts.length - 1) {
          this.currentIndex++;
      }
  }
  // Resets the index back to the beginning of the texts array
  reset() {
      this.currentIndex = 0;
  }
}


// Class that manages the game level and updates the instruction texts

export class GameLevel {
      // Initialize the game level
  constructor() {
      this.level = 1;
      // Create an instance of the TextManage
      this.textManager = new TextManager();
      this.text = this.textManager.getCurrentText();
  }
  // Method to advance to the next level
  nextLevel() {
      this.level++; // increment the level
      this.textManager.nextText();// Advance to the next text
      this.text = this.textManager.getCurrentText();// Update the displayed text
  }

  // Resets the game by setting the level and texts back to their initial state
restartGame() {
      this.level = 1;// Reset the level to 1
      this.textManager.reset();// Reset the texts
      this.text = this.textManager.getCurrentText();// Update the displayed text
  }
}

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
  totalErreurs:0,
  errorIndices:new Set(),
  accuracy : 0,
  text:"",

};

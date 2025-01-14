
function useGameData() {

  let gameData = {

      textContainer:[
      "Choose exactly what you want for your next race. You can choose your bots (challengers).",
      "Choose exactly what you want for your next race. You can choose your bots by entery his name and the power of the bot.",
      "Choose exactly what you want for your next race. You can choose your bots .you can train it yoursefl too to improve your level befor start compet with others.",

        ],
        namesContainer : ["jacques", "firmain", "sam", "paul"],
        powerContainer : [
                        "80 wpm",
                        "70 wpm",
                        "60 wpm",
                        "50 wpm",
                        "40 wpm",
                        "30 wpm",
                        "20 wpm",
                        "10 wpm",
                        ],
        carsConainer:["car0", "car1", "car2", "car3", "car6"],
        gameState: 'waiting',
        normal: false,
        computer: false,
        custom: false,
        botCreated: false,
        userProgress: 0,
        botProgress: 0,
        userScore: 0,
        botScore: 0,
        userFinished:0,
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
        second:0,
        minutes:0,
        startTimer:null,
        elapsedTimer:0,
        startChart:null,
        
        
  }
  
}








import { gameState} from "./gameData";

export function updateTimer() {
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
  
 export function updateDisplay() {
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
  
  
   
export function startTimerFunction() {
    if (! gameState.timerInterval) {
      gameState.startTimer = Date.now() +  gameState.elapsedTimer;
      gameState.timerInterval = setInterval(() => {
        gameState.elapsedTime++;
        updateTimer();
      }, 100);
    }
  }
  export function stopTimer() {
    clearInterval( gameState.timerInterval);
    gameState.timerInterval = null;
    // elapsedTimer += Date.now() - startTimer;
  }
  
 export function resetTimer() {
    gameState.milliseconds = 0;
    gameState.seconds = 0;
    gameState.minutes = 0;
    gameState.elapsedTimer = 0;
    updateDisplay();
  }
  
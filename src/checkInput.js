import { gameState } from "./gameData";


  export function check() {
    const inputText = document.querySelector(".text-input").value.trim().toLowerCase();
    const textElement = document.querySelector(".full");
    const spans = textElement.getElementsByTagName("span");
    const textContainer = gameState.text.trim().toLowerCase();
  
    // let correct = 0;
    // let incorrect = 0;
  
    for (let i = 0; i < textContainer.length; i++) {
      if (spans[i]) {
        if (i < inputText.length) {
          const inputChar = inputText[i];
          const targetChar = textContainer[i];
  
          if (inputChar === targetChar) {
            spans[i].className = "correct";
            // correct++; 
          } else {
            spans[i].className = "incorrect";
            // incorrect++; 
          }
        } else {
          spans[i].className = ""; // Pas encore tapé
        //   incorrect++; // Si l'utilisateur n'a pas tapé ce caractère, on le compte comme incorrect
        }
      }
    }
}
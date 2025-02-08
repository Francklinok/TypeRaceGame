import { gameState } from "./gameData";

// Afficher le texte d'introduction
export function displayText(text) {
  const textElement = document.querySelector(".full");
  // const text = gameState.text;
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

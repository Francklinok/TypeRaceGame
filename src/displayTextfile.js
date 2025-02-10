// import { gameState } from "./gameData";

// // Afficher le texte d'introduction
// export function displayText(text) {
//   console.log('my text is ', text)
//   const textElement = document.querySelector(".full");
//   // const text = gameState.text;
//   text.split("").forEach((char) => {
//     const span = document.createElement("span");
//     console.log('span text', span.textContent)

//     if (char === " ") {
//       span.style.marginRight = "8px"; // Ajustez la taille de la marge si nécessaire
//     }
//     span.textContent = char;
//     span.style.fontSize = "14px";
//     span.style.fontFamily = "Roboto";
//     textElement.appendChild(span);

//   });
// }
export function displayText(text) {
  console.log('📢 New text:', text);

  const textElement = document.querySelector(".full");
  if (!textElement) {
    console.error("❌ Element '.full' not found");
    return;
  }

  textElement.innerHTML = ""; // ✅ Efface le texte précédent

  text.split("").forEach((char) => {
    const span = document.createElement("span");

    if (char === " ") {
      span.style.marginRight = "8px";
    }

    span.textContent = char;
    span.style.fontSize = "14px";
    span.style.fontFamily = "Roboto";
    textElement.appendChild(span);
  });
}
 
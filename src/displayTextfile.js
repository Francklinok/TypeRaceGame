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
 
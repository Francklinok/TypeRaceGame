
export function displayText(text) {
  console.log('📢 New text:', text);
  const textElement = document.querySelector(".full");
  if (!textElement) {
    console.error("❌ Element '.full' not found");
    return;
  }

  // Clear previous text
  textElement.innerHTML = "";
  
  // Create container for current line
  let currentLine = document.createElement("div");
  currentLine.style.display = "flex";
  currentLine.style.flexWrap = "nowrap";
  textElement.appendChild(currentLine);

  // Get container width
  const containerWidth = textElement.offsetWidth;
  const maxWidth = containerWidth * 0.75; // 75% of container width
  
  // Track current line width
  let currentLineWidth = 0;

  // Create temporary span to measure character width
  const measureSpan = document.createElement("span");
  measureSpan.style.fontSize = "14px";
  measureSpan.style.fontFamily = "Roboto";
  measureSpan.style.position = "absolute";
  measureSpan.style.visibility = "hidden";
  textElement.appendChild(measureSpan);

  // Process each character
  text.split("").forEach((char, index) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.fontSize = "14px";
    span.style.fontFamily = "Roboto";
    
    if (char === " ") {
      span.style.marginRight = "8px";
    }

    // Measure this character
    measureSpan.textContent = char;
    const charWidth = measureSpan.offsetWidth + (char === " " ? 8 : 0);

    // Check if we need a new line
    if (currentLineWidth + charWidth > maxWidth) {
      // Create new line
      currentLine = document.createElement("div");
      currentLine.style.display = "flex";
      currentLine.style.flexWrap = "nowrap";
      currentLine.style.marginTop = "4px"; // Espace entre les lignes
      textElement.appendChild(currentLine);
      currentLineWidth = 0;
    }

    // Add character to current line
    currentLine.appendChild(span);
    currentLineWidth += charWidth;
  });

  // Remove measurement span
  measureSpan.remove();

  // Add style to container
  textElement.style.display = "flex";
  textElement.style.flexDirection = "column";
  textElement.style.alignItems = "flex-start";
}
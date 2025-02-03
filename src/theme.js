
export function themLoader() {
    const themeSelector = document.getElementById("theme-selector");
    const body = document.body;
  
    if (!themeSelector) {
      console.error("Element with id 'theme-selector' not found");
      return;
    }
  
    // Charger le thème sauvegardé
    const savedTheme = localStorage.getItem("theme");
    console.log("Saved theme:", savedTheme);
    if (savedTheme) {
      body.className = `theme-${savedTheme}`;
      themeSelector.value = savedTheme;
    }
  
    // Écouteur d'événement pour le changement de thème
    themeSelector.addEventListener("change", (event) => {
      const selectedTheme = event.target.value;
      console.log("Selected theme:", selectedTheme);
      body.className = `theme-${selectedTheme}`;
  
      // Sauvegarder dans le localStorage
      localStorage.setItem("theme", selectedTheme);
    });
  }
  
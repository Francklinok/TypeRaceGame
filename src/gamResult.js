import { gameState } from "./gameData";

export function gameResult() {
    console.log("Tentative d'affichage des résultats");

    // Vérifier si le conteneur existe
    let resultContainer = document.querySelector(".resultElement");
    if (!resultContainer) {
        console.log("Conteneur de résultats non trouvé");
        return;
    }

    // Rendre le conteneur visible
    resultContainer.style.display = "block";

    // Récupérer les dernières valeurs
    const lastWPM = gameState.userWPMData[gameState.userWPMData.length - 1] || 0;
    const lastCPM = gameState.userCPMData[gameState.userCPMData.length - 1] || 0;
    const timeInSeconds = Math.round(gameState.timeData.length -1 );

    // Préparer les données à afficher
    const results = {
        '.cpmdata': `CPM: ${lastCPM}`,
        '.wpmdata': `WPM: ${lastWPM}`,
        '.timedata': `Time: ${timeInSeconds}s`,
        '.errordata': `Errors: ${gameState.userErrors}`,
        '.precisiondata': `Precision: ${gameState.precision}%`,
        '.textdata': `Text: ${gameState.text.length}`
    };

    // Mettre à jour chaque élément
    for (const [selector, text] of Object.entries(results)) {
        const element = resultContainer.querySelector(selector);
        if (element) {
            element.textContent = text;
            console.log(`Mis à jour ${selector}:`, text);
        } else {
            console.log(`Élément non trouvé:`, selector);
        }
    }

    // Afficher un résumé dans la console
    console.log("Résultats affichés:", {
        wpm: lastWPM,
        cpm: lastCPM,
        time: timeInSeconds,
        errors: gameState.userErrors,
        precision: gameState.precision
    });
}

// // Fonction pour obtenir les statistiques actuelles
// export function getCurrentStats() {
//     return {
//         errors: gameState.userErrors,
//         precision: gameState.precision,
//         wpm: gameState.userWPMData[gameState.userWPMData.length - 1] || 0,
//         cpm: gameState.userCPMData[gameState.userCPMData.length - 1] || 0,
//         time: gameState.elapsedTime,
//         isFinished: gameState.userFinished
//     };
// }

// Initialisation des écouteurs d'événements
// export function initializeGame() {
//     const inputElement = document.querySelector(".text-input");
//     if (!inputElement) return;

//     // Réinitialiser l'état du jeu
//     gameState.hasStarted = false;
//     gameState.userFinished = false;
//     gameState.nbErreurs = 0;
//     gameState.precision = 0;
//     gameState.userErrors = 0;
//     gameState.userWPMData = [];
//     gameState.userCPMData = [];

//     // Cacher le conteneur de résultats au début
//     const resultContainer = document.querySelector(".resultElement");
//     if (resultContainer) {
//         resultContainer.style.display = "none";
//     }

//     console.log("Jeu initialisé");
// }m

////////

// import { gameState } from "./gameData";

// export function gameResult(inputText) {
//     if (!gameState.userFinished) {
//         return;
//     }

//     const cpm = Math.max(0, gameState.userCPMData.at(-1) || 0);
//     const wpm = Math.max(0, gameState.userWPMData.at(-1) || 0);
//     const time = Math.max(0, gameState.timeData.at(-1) || 0);
//     const error = gameState.nbErreurs;
//     const precision = gameState.precision;
//     const textLength = inputText.length;

//     const resultData = {
//         cpmdata: cpm,
//         wpmdata: wpm,
//         timedata: time,
//         errordata: error,
//         precision: precision,
//         textdata: textLength,
//     };

//     Object.entries(resultData).forEach(([key, value]) => {
//         Selector(key, value);
//     });
// }

// function Selector(className, dataElement) {
//     if (!className || dataElement === undefined) return;
//     const data = document.querySelector(`.${className}`);
//     if (data) {
//         data.textContent = String(dataElement);
//     }
//     return data;
// }


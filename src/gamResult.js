
import { gameState } from "./gameData";

export function gameResult() {
    const text = gameState.text;

    console.log("Tentative d'affichage des résultats");

    // 🟡 Ajoute un log des données avant affichage
    console.log("gameState avant affichage :", gameState);

    const resultContainer = document.querySelector(".resultElement");
    if (!resultContainer) {
        console.error("Conteneur de résultats non trouvé !");
        return;
    }

    if (!text) {
        console.warn("Aucun texte fourni !");
        return;
    }

    resultContainer.style.display = "block";

    // Extraction des données ou valeur par défaut si vide
    const lastWPM = gameState.userWPMData.length ? Math.floor(gameState.userWPMData.at(-1)) : 0; // Assure que c'est un entier
    const lastCPM = gameState.userCPMData.length ? Math.floor(gameState.userCPMData.at(-1)) : 0; // Assure que c'est un entier
    const timeInSeconds = gameState.timeData.length ? gameState.timeData.at(-1) : "0:00"; // Affiche le dernier élément, ou "0:00" si vide
    const bestWPM = gameState.userWPMData.length ? Math.floor(Math.max(...gameState.userWPMData)) : 0; // Assure que c'est un entier
    const bestCPM = gameState.userCPMData.length ? Math.floor(Math.max(...gameState.userCPMData)) : 0; // Assure que c'est un entier

    const results = {
        '.cpmdata': `  CPM: ${bestCPM}`,
        '.wpmdata': ` WPM: ${bestWPM}`,
        '.timedata': `elapsedTime: ${timeInSeconds}s`,
        '.errordata': `Error: ${gameState.nbErreurs}`,
        '.precisiondata':`Accuracy: ${gameState.accuracy}%`,
        '.textdata': `Longueur du texte: ${text.split(/\s+/).length}`
    };

    for (const [selector, content] of Object.entries(results)) {
        const element = resultContainer.querySelector(selector);
        if (element) {
            element.textContent = content;
            console.log(`Mis à jour ${selector}: ${content}`);
        } else {
            console.warn(`Élément non trouvé: ${selector}`);
        }
    }

    console.log("Résultats affichés :", {
        dernierWPM: lastWPM,
        meilleurWPM: bestWPM,
        dernierCPM: lastCPM,
        meilleurCPM: bestCPM,
        dernierTemps: timeInSeconds,
        erreurs: gameState.userErrors,
        precision: gameState.precision
    });
}


export function calculeError(target, input){
    let incorrect = 0;
    let correct = 0;
    resetErrorAccuracy()

    for (let i = 0; i < input.length; i++){
        if(!target[i] == input [i]){
            incorrect ++

        }else{
            correct ++;
        }
    }
    if(correct && input){
        calculateAccuracy(correct, input)
    }
    gameState.nbErreurs = incorrect;
    console.log('correct:', correct)
    console.log('incorrect:', incorrect)

}
  
function calculateAccuracy(correctText, inputText){
    resetErrorAccuracy()
    if(!correctText && !inputText){
        return ;
    }
    const accuracy = (correctText * 100) /  inputText.length
    gameState.accuracy = accuracy;
    console.log("acuracy", accuracy)
    return accuracy
}

function resetErrorAccuracy(){
    gameState.nbErreurs = 0;
    gameState.accuracy = 0;
}
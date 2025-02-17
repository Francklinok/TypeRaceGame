
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

    resultContainer.style.display = "flex";
    resultContainer.style.color = "white";
    resultContainer.style.padding = "20px";
    resultContainer.style.textAlign = "center"; 
    resultContainer.style.margin = "20px";
    resultContainer.style.maxWidth = "400px";

    
    // Extraction des données ou valeur par défaut si vide
    const lastWPM = gameState.userWPMData.length ? Math.floor(gameState.userWPMData.at(-1)) : 0; // Assure que c'est un entier
    const lastCPM = gameState.userCPMData.length ? Math.floor(gameState.userCPMData.at(-1)) : 0; // Assure que c'est un entier
    const timeInSeconds = gameState.timeData.length ? gameState.timeData.at(-1) : "0:00"; // Affiche le dernier élément, ou "0:00" si vide
    const bestWPM = gameState.userWPMData.length ? Math.floor(Math.max(...gameState.userWPMData)) : 0; // Assure que c'est un entier
    const bestCPM = gameState.userCPMData.length ? Math.floor(Math.max(...gameState.userCPMData)) : 0; // Assure que c'est un entier

    const results = {
        '.cpmdata': `  CPM:   ${bestCPM}`,
        '.wpmdata': ` WPM:   ${bestWPM}`,
        '.timedata': `elapsedTime:   ${timeInSeconds}s`,
        '.errordata': `Error:   ${gameState.nbErreurs}`,
        '.precisiondata':`Accuracy:   ${gameState.accuracy}%`,
        '.textdata': `Longueur du texte:   ${text.split(/\s+/).length}`
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

// const errorIndices = new Set();

export function calculeError(target, input) {
    let correct = 0;
    
    // Utiliser la plus grande longueur pour vérifier tous les caractères
    const maxLength = Math.max(target.length, input.length);
    
    for (let i = 0; i < maxLength; i++) {
        const targetChar = target[i] || '';
        const inputChar = input[i] || '';
        
        // Ignorer les espaces
        if (inputChar === ' ' || targetChar === ' ') {
            continue;
        }
        
        // Si un caractère incorrect est tapé, ajouter son index aux erreurs
        if (inputChar !== targetChar && inputChar !== '') {
            gameState.errorIndices.add(i);
        }
        
        // Compter les caractères corrects (pour la précision)
        if (inputChar === targetChar && inputChar !== '') {
            correct++;
        }
    }
    
    // Le nombre total d'erreurs est maintenant la taille du Set
    gameState.nbErreurs = gameState.errorIndices.size;
    
    // Calculer la précision avec le nombre total de caractères non-espaces tapés
    if (correct > 0 || gameState.errorIndices.size > 0) {
        const total = correct + gameState.errorIndices.size;
        const accuracy = Math.round((correct / total) * 100);
        gameState.accuracy = accuracy;
    } else {
        gameState.accuracy = 0;
    }
    
    console.log({
        caractèresCorrects: correct,
        erreursPermanentes: gameState.errorIndices.size,
        indicesErreurs: Array.from(gameState.errorIndices),
        précision: gameState.accuracy + '%'
    });
    
    return {
        correct,
        errors: gameState.errorIndices.size,
        accuracy: gameState.accuracy
    };
}

// Fonction pour réinitialiser les erreurs (à appeler au début d'une nouvelle partie)
// export function resetErrors() {
//     console.log("reset error  is call")
//     errorIndices.clear();
//     gameState.nbErreurs = 0;
//     gameState.accuracy = 0;
//     consolelog('error indices is ',errorIndices)}
 
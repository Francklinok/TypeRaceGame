

import { gameState } from "./gameData";

// Fonction principale de vérification pendant la saisie
export function check() {
    const inputText = document.querySelector(".text-input").value;
    const textElement = document.querySelector(".full");
    const spans = textElement.getElementsByTagName("span");
    const textContainer = gameState.text;

    console.log("Vérification - Longueur saisie:", inputText.length);
    console.log("Vérification - Longueur cible:", textContainer.length);

    // Initialisation au premier caractère
    if (!gameState.hasStarted && inputText.length > 0) {
        gameState.hasStarted = true;
        gameState.nbErreurs = 0;
        gameState.precision = 0;
        gameState.userErrors = 0;
        console.log("Jeu démarré");
    }

    let currentErrors = 0;
    console.log(currentErrors);

    // Vérification des caractères
    for (let i = 0; i < textContainer.length; i++) {
        if (spans[i]) { 
            if (i < inputText.length) {
                if (inputText[i] === textContainer[i]) {
                    spans[i].className = "correct";
                } else {
                    spans[i].className = "incorrect";
                    currentErrors++;
                }
            } else {
                spans[i].className = "";
            }
        }
    }

    // Mise à jour des erreurs
    gameState.nbErreurs = currentErrors;
    // gameState.userErrors = currentErrors;
    console.log('user error', gameState.nbErreurs)
    // Calculer la précision en temps réel
    if (inputText.length > 0) {
        const correctChars = inputText.length - currentErrors;
        gameState.precision = Math.round((correctChars / inputText.length) * 100);
    }

    // Vérifier si le jeu est terminé
    // if (isGameFinished(inputText, textContainer)) {
    //     calculateFinalStats(inputText.length, textContainer.length);
    //     gameResult(); // Appel de gameResult pour afficher les résultats
    // }
}

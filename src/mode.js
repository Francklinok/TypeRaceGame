import { resetGame } from "./resetGameFile";
import { clearRaceContainer } from "./userManage";
import { createdBot } from "./userManage";
import { renderPlayerTrack } from "./render";
import { gameState } from "./gameData";

export function normalRace() {
  resetGame()

  if (gameState.normal) {
    // Si le mode "normal" est déjà actif, ne rien faire
    console.log("Mode normal déjà actif, aucune action effectuée.");
    return;
  }

  // Passer en mode "normal"
  gameState.normal = true;
  gameState.custom = false;
  gameState.computer = false;

  clearRaceContainer();
  console.log("Mode normal activé.");
  return gameState.normal;
}

export function customRace() {
  if (gameState.custom) {
    // Si le mode "custom" est déjà actif, ne rien faire
    console.log("Mode custom déjà actif, aucune action effectuée.");
    return;
  }
  resetGame()
  // Passer en mode "custom"
  gameState.normal = false;
  gameState.custom = true;
  gameState.computer = false;

  clearRaceContainer();

  // Vérification si le bot existe déjà dans la liste des bots
  const botExists = gameState.bots.some(
    (bot) => bot.name === gameState.selectedName && bot.power === gameState.selectedPower
  );

  if (botExists) {
    console.log("Ce bot a déjà été ajouté.");
    return; // Si le bot existe déjà, ne rien faire
  } else {
    gameState.bots.push({ name: gameState.selectedName, power: gameState.selectedPower });
    console.log("Bot ajouté :", gameState.bots);
    createdBot();
    gameState.botCount++;
    console.log("Bot ajouté : ", gameState.selectedName, "Puissance : ", gameState.selectedPower);
  }

  console.log("Mode custom activé.");
  return gameState.custom;
}

export function computerRace() {
  if (gameState.computer) {
    // Si le mode "computer" est déjà actif, ne rien faire
    console.log("Mode computer déjà actif, aucune action effectuée.");
    return;
  }
  resetGame()

  // Passer en mode "computer"
  gameState.normal = false;
  gameState.custom = false;
  gameState.computer = true;

  clearRaceContainer();

  if (!gameState.botCreated) {
    renderPlayerTrack();
    gameState.botCreated = true;
  }

  console.log("Mode computer activé.");
  return gameState.computer;
}


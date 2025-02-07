import Chart from "chart.js/auto";
import { gameState } from "./gameData";



export function displayFinalChart() {
  const canvas = document.querySelector(".chart");
  if (!canvas) {
    console.error("Canvas avec la classe 'chart' introuvable !");
    return;
  }

  const ctx = canvas.getContext("2d");

  // Détruire un ancien graphique s'il existe
  if (gameState.startChart) {
    gameState.startChart.destroy();
  }

  // Définir des limites réalistes pour les axes
  const minWPM = 0; // Minimum pour WPM
  const maxWPM = 100; // Maximum réaliste pour WPM
  const minCPM = 0; // Minimum pour CPM
  const maxCPM = Math.ceil(Math.max(...gameState.userCPMData, 0) / 10) * 10; // Calcul basé sur vos données

  // Création du graphique avec deux axes Y
  gameState.startChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: gameState.timeData, // Les données de temps sur l'axe des X
      datasets: [
        {
          label: "User WPM",
          data: gameState.userWPMData,
          borderColor: "rgba(0, 123, 255, 1)",
          backgroundColor: "rgba(0, 123, 255, 0.2)",
          fill: true,
          tension: 0.4,
          yAxisID: "y1", // Associe cette série de données à l'axe Y1
        },
        {
          label: "User CPM",
          data: gameState.userCPMData,
          borderColor: "rgba(40, 167, 69, 1)",
          backgroundColor: "rgba(40, 167, 69, 0.2)",
          fill: true,
          tension: 0.4,
          yAxisID: "y2", // Associe cette série de données à l'axe Y2
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Temps (secondes)",
          },
        },
        y1: {
          title: {
            display: true,
            text: "Vitesse WPM",
          },
          beginAtZero: true,
          min: minWPM, // Minimum fixé
          max: maxWPM, // Maximum fixé
          position: "left", // Positionner cet axe à gauche
          ticks: {
            stepSize: 10, // Intervalle entre les graduations
            callback: function (value) {
              return value + " WPM"; // Ajouter une unité à l'échelle
            },
          },
        },
        y2: {
          title: {
            display: true,
            text: "Vitesse CPM",
          },
          beginAtZero: true,
          min: minCPM, // Minimum calculé pour CPM
          max: maxCPM, // Maximum calculé pour CPM
          position: "right", // Positionner cet axe à droite
          grid: {
            drawOnChartArea: false, // Empêche les lignes de grille de se superposer
          },
          ticks: {
            stepSize: 50, // Intervalle entre les graduations pour CPM
            callback: function (value) {
              return value + " CPM"; // Ajouter une unité à l'échelle
            },
          },
        },
      },
      animation: {
        duration: 1000,
        easing: "easeOutCubic",
      },
    },
  });

}

const colorOptions = ["🔴 Red", "🟢 Green", "🟣 Violet"];
const sizeOptions = ["Big", "Small"];
const redNumbers = ["2", "4", "6", "8"];
const greenNumbers = ["1", "3", "7", "9"];
const violetNumbers = ["0", "5"];

let predictionHistory = [];
let colorPredictionHistory = [];
let sizePredictionHistory = [];
let numberPredictionHistory = [];

function updateTimer() {
    const currentTimeGMT = new Date().toISOString(); // Get current GMT time
    const currentSeconds = new Date(currentTimeGMT).getUTCSeconds();

    const countdown = 60 - currentSeconds; // Calculate remaining seconds in the minute
    document.getElementById("countdown-timer").innerText = `Time Remaining :- ${countdown}`;

    if (countdown === 60) {
        generatePrediction(); // Generate a new prediction at the start of every minute
    }
}

setInterval(updateTimer, 1000);

function generatePrediction() {
    const currentTimeGMT = new Date(); // Current GMT time
    const hours = currentTimeGMT.getUTCHours();
    const minutes = currentTimeGMT.getUTCMinutes();
    const totalMinutes = hours * 60 + minutes;
    const periodNumber = totalMinutes + 1;

    const predictionColor = getAIPredictedColor();
    const predictionSize = getAIPredictedSize();
    const predictionNumber = getAIPredictedNumber(predictionColor, predictionSize);

    document.getElementById("period-number").innerText = periodNumber;
    document.getElementById("prediction-color").innerText = predictionColor;
    document.getElementById("prediction-size").innerText = predictionSize;
    document.getElementById("prediction-number").innerText = predictionNumber;

    const predictionResult = `Period ${periodNumber}: ${predictionColor}, ${predictionSize}, ${predictionNumber}`;
    predictionHistory.unshift(predictionResult);
    if (predictionHistory.length > 10) predictionHistory.pop();

    colorPredictionHistory.unshift(predictionColor);
    sizePredictionHistory.unshift(predictionSize);
    numberPredictionHistory.unshift(predictionNumber);

    updateHistoryDisplay();
}

function getAIPredictedColor() {
    const previousColor = colorPredictionHistory[0];
    const dangerFactor = (Math.random() < 0.2); // 20% chance of danger condition
    if (dangerFactor) {
        // Shift to another color if the same color appeared frequently
        if (previousColor === "🔴 Red") {
            return Math.random() < 0.5 ? "🟢 Green" : "🟣 Violet";
        } else if (previousColor === "🟢 Green") {
            return Math.random() < 0.5 ? "🔴 Red" : "🟣 Violet";
        } else {
            return Math.random() < 0.5 ? "🔴 Red" : "🟢 Green";
        }
    }
    return getRandomColor();
}

function getAIPredictedSize() {
    const previousSize = sizePredictionHistory[0];
    const dangerFactor = (Math.random() < 0.2); // 20% chance of danger condition
    if (dangerFactor) {
        // Switch size if the same size has been predicted multiple times
        if (previousSize === "Big") {
            return "Small";
        } else {
            return "Big";
        }
    }
    return getRandomSize();
}

function getAIPredictedNumber(color, size) {
    let numbers;
    if (color === "🟣 Violet") {
        numbers = size === "Small" ? violetNumbers[0] : violetNumbers[1];
    } else if (color === "🔴 Red") {
        numbers = size === "Small" ? redNumbers.slice(0, 2) : redNumbers.slice(2, 4);
    } else {
        numbers = size === "Small" ? greenNumbers.slice(0, 2) : greenNumbers.slice(2, 4);
    }

    // Danger logic to avoid repeated numbers
    const dangerFactor = (Math.random() < 0.2); // 20% chance of danger condition
    if (dangerFactor) {
        const previousNumber = numberPredictionHistory[0];
        // Switch to an alternative number if the same number appeared recently
        if (numbers.includes(previousNumber)) {
            numbers = numbers.filter(num => num !== previousNumber);
        }
    }

    return Array.isArray(numbers) ? numbers[Math.floor(Math.random() * numbers.length)] : numbers;
}

function getRandomColor() {
    const rand = Math.random();
    if (rand < 0.4) return colorOptions[0];
    else if (rand < 0.7) return colorOptions[1];
    else return colorOptions[2];
}

function getRandomSize() {
    return Math.random() < 0.5 ? sizeOptions[0] : sizeOptions[1];
}

function updateHistoryDisplay() {
    const historyContainer = document.getElementById("prediction-history");
    historyContainer.innerHTML = "<h4>Prediction History</h4>";
    predictionHistory.forEach((result) => {
        const div = document.createElement("div");
        div.innerText = result;
        historyContainer.appendChild(div);
    });
}

window.onload = generatePrediction;
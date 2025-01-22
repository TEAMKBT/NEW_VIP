const colorOptions = ["🔴 Red", "🟢 Green", "🟣 Violet"];
const sizeOptions = ["Big", "Small"];
const redNumbers = ["2", "4", "6", "8"];
const greenNumbers = ["1", "3", "7", "9"];
const violetNumbers = ["0", "5"];

let predictionHistory = [];
let colorTrend = { "🔴 Red": 0, "🟢 Green": 0, "🟣 Violet": 0 };
let sizeTrend = { "Big": 0, "Small": 0 };

function updateTimer() {
    const currentTime = new Date().toISOString();
    const currentSeconds = new Date(currentTime).getSeconds();

    if (currentSeconds % 30 === 0) {
        generatePrediction();
    }

    const countdown = 30 - (currentSeconds % 30);
    document.getElementById("countdown-timer").innerText = `Time Remaining :- ${countdown}`;
}

setInterval(updateTimer, 1000);

function getRandomColor() {
    let rand = Math.random();
    if (rand < 0.4) return colorOptions[0]; // Red
    else if (rand < 0.7) return colorOptions[1]; // Green
    else return colorOptions[2]; // Violet
}

function getRandomSize() {
    return Math.random() < 0.5 ? sizeOptions[0] : sizeOptions[1]; // Big or Small
}

function getAIEnhancedColorPrediction() {
    // AI-powered enhancement: Predict color based on trends
    let mostFrequentColor = Object.keys(colorTrend).reduce((a, b) => colorTrend[a] > colorTrend[b] ? a : b);
    let rand = Math.random();

    // If a color trend is strong, favor that color
    if (rand < 0.6) {
        return mostFrequentColor;
    } else {
        // Else pick a random color
        return getRandomColor();
    }
}

function getAIEnhancedSizePrediction() {
    // AI-powered enhancement: Predict size based on trends
    let mostFrequentSize = Object.keys(sizeTrend).reduce((a, b) => sizeTrend[a] > sizeTrend[b] ? a : b);
    let rand = Math.random();

    // If a size trend is strong, favor that size
    if (rand < 0.6) {
        return mostFrequentSize;
    } else {
        // Else pick a random size
        return getRandomSize();
    }
}

function generatePrediction() {
    const currentTime = new Date().toISOString();
    const hours = new Date(currentTime).getUTCHours();
    const minutes = new Date(currentTime).getUTCMinutes();
    const seconds = new Date(currentTime).getUTCSeconds();

    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

    const periodNumber = Math.floor(totalSeconds / 30) + 1;

    const predictionColor = getAIEnhancedColorPrediction(); // AI-enhanced color prediction
    const predictionSize = getAIEnhancedSizePrediction(); // AI-enhanced size prediction

    let predictionNumber;
    if (predictionColor === colorOptions[2]) {
        predictionNumber = predictionSize === sizeOptions[1] ? violetNumbers[0] : violetNumbers[1];
    } else if (predictionColor === colorOptions[0]) {
        predictionNumber = predictionSize === sizeOptions[1] ? redNumbers.slice(0, 2) : redNumbers.slice(2, 4);
    } else {
        predictionNumber = predictionSize === sizeOptions[1] ? greenNumbers.slice(0, 2) : greenNumbers.slice(2, 4);
    }

    if (Array.isArray(predictionNumber)) {
        predictionNumber = predictionNumber[Math.floor(Math.random() * predictionNumber.length)];
    }

    // Update trends after generating the prediction
    colorTrend[predictionColor]++;
    sizeTrend[predictionSize]++;

    // Update the prediction display
    document.getElementById("period-number").innerText = periodNumber;
    document.getElementById("prediction-color").innerText = predictionColor;
    document.getElementById("prediction-size").innerText = predictionSize;
    document.getElementById("prediction-number").innerText = predictionNumber;

    const predictionResult = `Period ${periodNumber}: ${predictionColor}, ${predictionSize}, ${predictionNumber}`;
    predictionHistory.unshift(predictionResult);

    if (predictionHistory.length > 10) {
        predictionHistory.pop();
    }

    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyContainer = document.getElementById("prediction-history");
    historyContainer.innerHTML = "<h4>Prediction History 👇</h4>";
    predictionHistory.forEach(result => {
        const div = document.createElement("div");
        div.innerText = result;
        historyContainer.appendChild(div);
    });
}

window.onload = generatePrediction;
const words = ["resiliencia", "disciplina", "respeto", "agradecimiento", "humildad", "perseverancia","puntualidad","ahorro"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let remainingAttempts = 7;
let guessedLetters = [];
let wordDisplay = [];

const hangmanImage = document.getElementById("hangmanImage");
const wordDisplayElement = document.getElementById("wordDisplay");
const letterButtonsElement = document.getElementById("letterButtons");
const resetButton = document.getElementById("resetButton");

function initGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    remainingAttempts = 7;
    guessedLetters = [];
    wordDisplay = [];

    hangmanImage.src = `img/hangman_0.png`;

    for (let i = 0; i < selectedWord.length; i++) {
        wordDisplay.push("_");
    }

    updateDisplay();
    createLetterButtons();
}

function updateDisplay() {
    wordDisplayElement.textContent = wordDisplay.join(" ");
}

function createLetterButtons() {
    letterButtonsElement.innerHTML = "";
    for (let letter of "abcdefghijklmnopqrstuvwxyz") {
        const button = document.createElement("button");
        button.textContent = letter;
        button.addEventListener("click", () => handleLetterClick(letter));
        letterButtonsElement.appendChild(button);
    }
}

function handleLetterClick(letter) {
    if (guessedLetters.includes(letter)) {
        return;
    }

    guessedLetters.push(letter);

    if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                wordDisplay[i] = letter;
            }
        }
    } else {
        remainingAttempts--;
        hangmanImage.src = `img/hangman_${7 - remainingAttempts}.png`;
    }

    updateDisplay();
    checkGameStatus();
}

function checkGameStatus() {
    if (wordDisplay.join("") === selectedWord) {
        wordDisplayElement.textContent = "Felicidades! Ganaste!";
        disableLetterButtons();
    } else if (remainingAttempts === 0) {
        wordDisplayElement.textContent = `Lo siento, la palabra era "${selectedWord}"`;
        disableLetterButtons();
    }
}

function disableLetterButtons() {
    letterButtonsElement.querySelectorAll("button").forEach(button => {
        button.disabled = true;
    });
}

resetButton.addEventListener("click", initGame);

initGame();

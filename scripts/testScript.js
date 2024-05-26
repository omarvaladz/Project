document.addEventListener("DOMContentLoaded", () => {
    const conceptsContainer = document.querySelector(".concepts");
    const descriptionsContainer = document.querySelector(".descriptions");
    const checkButton = document.getElementById("checkButton");
    const scoreElement = document.getElementById("score");
    const attemptsElement = document.getElementById("attempts");

    // Restringir el arrastre de conceptos después de que se agoten los intentos
    let dragEnabled = true;

    const correctAnswers = {
        "Sentido común": "Utiliza el razonamiento y la lógica en tu toma de decisiones. No te dejes llevar solo por emociones.",
        "Puntualidad": "Valora el tiempo tuyo y de los demás.",
        "Austeridad": "Gasta con prudencia y evita el desperdicio.",
        "Humildad": "Reconoce tus limitaciones y valora a los demás sin importar su posición o estatus.",
        "Resiliencia": "Aprende a enfrentar los desafíos y dificultades con determinación y fortaleza.",
        "Perseverancia": "Mantén tu esfuerzo constante en busca de tus metas, incluso cuando enfrentes obstáculos.",
        "Gusto por el trabajo": "Mientras mayor aprecio se tenga por la profesión personal, mejor se desempeñará ésta.",
        "Afán por el ahorro y la inversión": "La posibilidad de que los gastos superen a los ingresos siempre será mayor en estos tiempos.",
        "Disciplina": "Para lograr tus objetivos y mantener una vida ordenada.",
        "Educación y aprendizaje": "El conocimiento es una herramienta poderosa."
    };

    const shuffledConcepts = Object.keys(correctAnswers).sort(() => Math.random() - 0.5);
    const shuffledDescriptions = Object.values(correctAnswers).sort(() => Math.random() - 0.5);

    let score = 0;
    let attempts = 1;

    function createConceptsAndDescriptions() {
        conceptsContainer.innerHTML = "";
        descriptionsContainer.innerHTML = "";

        shuffledConcepts.forEach(concept => {
            const conceptElement = document.createElement("div");
            conceptElement.classList.add("concept");
            conceptElement.dataset.concept = concept;
            conceptElement.draggable = true;
            conceptElement.textContent = concept;
            conceptsContainer.appendChild(conceptElement);
        });

        shuffledDescriptions.forEach(description => {
            const descriptionElement = document.createElement("div");
            descriptionElement.classList.add("description");
            descriptionElement.dataset.correct = description;
            descriptionElement.textContent = description;
            descriptionsContainer.appendChild(descriptionElement);
        });
    }

    createConceptsAndDescriptions();

    conceptsContainer.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", event.target.dataset.concept);
    });

    descriptionsContainer.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    descriptionsContainer.addEventListener("drop", (event) => {

        if (!dragEnabled) {
            return; // Si no está habilitado el arrastre, no hacer nada
        }

        event.preventDefault();
        const droppedConcept = event.dataTransfer.getData("text/plain");
        const descriptionElement = event.target;

        if (descriptionElement.classList.contains("description") && !descriptionElement.classList.contains("answered")) {
            const conceptElement = conceptsContainer.querySelector(`.concept:not(.used)[data-concept="${droppedConcept}"]`);

            if (conceptElement) {
                descriptionElement.classList.add("answered");

                if (descriptionElement.dataset.correct === correctAnswers[droppedConcept]) {
                    descriptionElement.style.backgroundColor = "#c3e6cb";
                    conceptElement.style.backgroundColor = "#c3e6cb";
                    conceptElement.classList.add("correct");
                    score++;
                } else {
                    descriptionElement.style.backgroundColor = "#f8d7da";
                    conceptElement.style.backgroundColor = "#f8d7da";
                    conceptElement.classList.add("incorrect");
                }

                conceptElement.classList.add("used");
                conceptElement.draggable = false;
                checkScore();
            }
        }
    });

    function checkScore() {
        scoreElement.textContent = `Puntuación: ${score} / ${shuffledConcepts.length}`;

        if (score >= 6) {
            scoreElement.textContent += " (Aprobado)";
        } else {
            scoreElement.textContent += " (Reprobado)";
        }
    }

    checkButton.addEventListener("click", () => {
        if (attempts > 0) {
            attempts--;
            attemptsElement.textContent = `Intentos restantes: ${attempts}`;

            if (attempts === 0) {
                checkButton.disabled = true;
                attemptsElement.textContent = "¡Intentos agotados!";
                dragEnabled = false; // Deshabilitar el arrastre de conceptos
            }
        }
    });

    // Restablecer el juego al cargar la página
    function resetGame() {
        score = 0;
        attempts = 1;
        scoreElement.textContent = "Puntuación: 0 / " + shuffledConcepts.length;
        attemptsElement.textContent = "Intentos restantes: " + attempts;
        checkButton.disabled = false;
        createConceptsAndDescriptions();
    }

    resetGame();
});

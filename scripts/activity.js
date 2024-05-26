document.addEventListener("DOMContentLoaded", function () {
    const quizForm = document.getElementById("quiz-form");
    const resultsContainer = document.getElementById("results");
    const lowScoreImg = document.getElementById("low-score-img");
    const highScoreImg = document.getElementById("high-score-img");
    const correctAnswers = {
        q1: "c", // Respuesta correcta para la pregunta 1
        q2: "b", // Respuesta correcta para la pregunta 2
        q3: "b", // Respuesta correcta para la pregunta 3
        q4: "b", // Respuesta correcta para la pregunta 4
        q5: "b", // Respuesta correcta para la pregunta 5
        q6: "a", // Respuesta correcta para la pregunta 6
        q7: "a", // Respuesta correcta para la pregunta 7
        q8: "c", // Respuesta correcta para la pregunta 8
        q9: "a", // Respuesta correcta para la pregunta 9
        q10: "a" // Respuesta correcta para la pregunta 10
    };

    quizForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let score = 0;
        const userAnswers = {
            q1: quizForm.elements.q1.value,
            q2: quizForm.elements.q2.value,
            q3: quizForm.elements.q3.value,
            q4: quizForm.elements.q4.value,
            q5: quizForm.elements.q5.value,
            q6: quizForm.elements.q6.value,
            q7: quizForm.elements.q7.value,
            q8: quizForm.elements.q8.value,
            q9: quizForm.elements.q9.value,
            q10: quizForm.elements.q10.value
        };

        // Limpia cualquier resultado anterior
        resultsContainer.innerHTML = "";

        for (const key in correctAnswers) {
            const questionElement = document.getElementById(key + "-feedback");

            if (userAnswers[key] === correctAnswers[key]) {
                score++;
            } else {
                // Muestra corrección para respuestas incorrectas
                const correctionDiv = document.createElement("div");
                correctionDiv.innerHTML = `Respuesta correcta: ${correctAnswers[key]}`;
                questionElement.appendChild(correctionDiv);
            }
        }

        const percentage = (score / Object.keys(correctAnswers).length) * 100;
        resultsContainer.innerHTML = `Tu puntuación es: ${score}/${Object.keys(correctAnswers).length} (${percentage}%)`;

        // Muestra la imagen correspondiente según la puntuación
        if (percentage <= 50) {
            lowScoreImg.style.display = "block"; // Muestra la imagen de puntuación baja
            highScoreImg.style.display = "none"; // Oculta la imagen de puntuación alta
        } else {
            lowScoreImg.style.display = "none"; // Oculta la imagen de puntuación baja
            highScoreImg.style.display = "block"; // Muestra la imagen de puntuación alta
        }
    });
});

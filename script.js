
document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("start-btn");
    const content = document.querySelector(".content");
    const overlay = document.querySelector(".overlay");
    const quizSection = document.getElementById("quiz-section");
    const resultBox = document.getElementById("result-box");

    let totalQuestions = 0;
    let correctAnswers = 0;

    totalQuestions = quizSection.querySelectorAll("section.question").length;

    startBtn.addEventListener("click", function () {
        content.style.display = "none";
        overlay.style.display = "none";
        quizSection.style.display = "block";

   
        quizSection.querySelectorAll("section.question").forEach((sec, idx) => {
            sec.style.display = idx === 0 ? "block" : "none";
        });
    });

    const submitButtons = document.querySelectorAll(".submit-btn");

    submitButtons.forEach(button => {
        button.addEventListener("click", function () {
            const currentSection = this.closest(".question");
            const selectedOption = currentSection.querySelector('input[type="radio"]:checked');
            const feedback = currentSection.querySelector(".answer-feedback");

            if (!selectedOption) {
                alert("Please select an answer before submitting!");
                return;
            }

            if (selectedOption.value === "correct") {
                feedback.textContent = "Correct! 🎉";
                feedback.style.color = "green";
                correctAnswers++;
            } else {
                feedback.textContent = "Wrong! ❌";
                feedback.style.color = "red";
            }

            currentSection.querySelectorAll('input[type="radio"]').forEach(input => input.disabled = true);
            this.disabled = true;

            setTimeout(() => {
                const nextQuestionNum = parseInt(currentSection.dataset.question) + 1;
                const nextSection = quizSection.querySelector(`section[data-question="${nextQuestionNum}"]`);

                currentSection.style.display = "none";

                if (nextSection) {
                    nextSection.style.display = "block";
                } else {
            
                    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
                    resultBox.innerHTML = `
                        <h2>Quiz Completed!</h2>
                        <p>You got <strong>${correctAnswers}</strong> out of <strong>${totalQuestions}</strong> questions right.</p>
                        <p>Your Score: <strong>${percentage}%</strong></p>
                    `;
                    resultBox.style.display = "block";
                }
            }, 2000);
        });
    });
});

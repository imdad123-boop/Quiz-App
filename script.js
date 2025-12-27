const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true },
            { text: "Bhutan", correct: false },
            { text: "Nepal", correct: false },
            { text: "Sri Lanka", correct: false }
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true }
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answers-buttons");
const nextButton = document.getElementById("next-btn");
const playAgainButton = document.createElement("button");

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    playAgainButton.style.display = "none";  // Hide the play again button at the start
    showQuestion();
}

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestionIndex + 1 + ". " + currentQuestion.question;

    answerButton.innerHTML = ''; // Clear previous answers
    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(answer, button));
        answerButton.appendChild(button);
    });

    nextButton.style.display = "none"; // Hide next button until answer is selected
}

function selectAnswer(answer, button) {
    // Disable all buttons once an answer is selected
    const buttons = answerButton.querySelectorAll("button");
    buttons.forEach((button) => button.disabled = true);

    selectedAnswer = answer;
    if (selectedAnswer.correct) {
        score++;
        button.style.backgroundColor = 'green';
    } else {
        button.style.backgroundColor = 'red';
    }

    nextButton.style.display = "block"; // Show next button after an answer is selected
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    questionElement.innerHTML = `Quiz Finished! Your score is ${score} out of ${questions.length}`;
    answerButton.innerHTML = '';

    // Show Play Again Button with custom width (smaller than other buttons)
    playAgainButton.innerHTML = "Play Again";
    playAgainButton.classList.add("btn1");  // Add the 'btn' class to style it like other buttons
    playAgainButton.style.display = "inline-block";  // Make Play Again button visible
    playAgainButton.style.width = "200px";  // Set width to auto for a smaller button
    playAgainButton.style.padding = "5px";  // Adjust padding to make it smaller
    playAgainButton.addEventListener("click", resetQuiz);

    answerButton.appendChild(playAgainButton); // Append the Play Again button
    nextButton.style.display = "none"; // Hide the next button
}

function resetQuiz() {
    playAgainButton.style.display = "none";  // Hide Play Again button
    startQuiz();  // Reset the quiz
}

startQuiz();

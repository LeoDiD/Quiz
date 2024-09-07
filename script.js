const quizData = [
    {
        question: "What is the most used programming language in 2019?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "Who is the President of US?",
        a: "narendra modi",
        b: "Donald Trump",
        c: "Ivan Saldano",
        d: "Mihai Andrei",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Cascading Style Sheet",
        c: "Jason Object Notation",
        d: "Hello there machine learning",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
    {
        question: "Which of the following is a JavaScript framework?",
        a: "Django",
        b: "React",
        c: "Laravel",
        d: "Pogi ko",
        correct: "b",
    },
    {
        question: "Which of the following data structures follows the First In First Out (FIFO) principle?",
        a: "Stack",
        b: "Queue",
        c: "Array list",
        d: "love u",
        correct: "b", 
    }
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const skipBtn = document.getElementById("skip"); // Add a new button element with id "skip"
const timerEl = document.getElementById("timer");
const progressBar = document.getElementById("progressBar"); // New progress bar element

let currentQuiz = 0;
let score = 0;
let timeLeft = 20;
let timerInterval = null;
let skipCount = 1; // Add a skip count variable

// Function to randomize the quiz questions
function randomizeQuiz() {
    for (let i = quizData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        [quizData[i], quizData[j]] = [quizData[j], quizData[i]];
    }
}

randomizeQuiz();
loadQuiz();

function loadQuiz() {
    deselectAnswers();
    timeLeft = 20; 
    timerInterval = setInterval(countdown, 1000); 

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;

    updateProgressBar(); // Update the progress bar each time a question is loaded
}

function getSelected() {
    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
}

function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

function countdown() {
    timeLeft--;
    timerEl.innerText = `Time left: ${timeLeft} seconds`;

    if (timeLeft <= 0) {
        resetTimer();
        currentQuiz = 0;
        randomizeQuiz();
        loadQuiz();
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 20;
    timerInterval = null;
    timerEl.innerText = `Time left: 20 seconds`;
}

// Progress Bar Update Function
function updateProgressBar() {
    const progressPercentage = ((currentQuiz + 1) / quizData.length) * 75;
    progressBar.style.width = progressPercentage + "%"; // Update the width based on progress
}

skipBtn.addEventListener("click", () => {
    skipCount++;
    if (skipCount < 0) { // Check if skip count is less than 3

        skipIndicator.innerText = `Skips: ${skipCount}/3`;
        currentQuiz++;
        loadQuiz();
    } else {
        alert("You've reached the maximum number of skips!");
    }
});
function updateQuestion() {
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

submitBtn.addEventListener("click", () => {
    resetTimer();

    const answer = getSelected();

    if (answer !== undefined) { 
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;
        updateProgressBar(); // Update the progress bar here
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `
                <h2>You answered correctly at ${score}/${quizData.length} questions.</h2>
                
                <button onclick="location.reload()">Reload</button>
            `;
        }
    } else {
        alert("Please select an answer!"); 
    }
});